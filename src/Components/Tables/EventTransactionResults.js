import React, { useState, useEffect } from 'react'
import { useDayStore, useSort } from '../../store/event'
import { getTransactions } from '../../apis/tranaction'
import { Table } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { usePaidMembers, useUnpaidMembers } from '../../store/event'

const EventTransactionResults = ({ eventId }) => {
    const groupId = window.location.href.split('/')[4]
    const { startDate, endDate } = useDayStore()
    const { sort } = useSort()
    const [members, setMembers] = useState([])
    // const [paidMembers, setPaidMembers] = useState([])
    // const [unpaidMembers, setUnpaidMembers] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedMemberIds, setSelectedMemberIds] = useState([])

    const { paidMembers, setPaidMembers } = usePaidMembers()
    const { unpaidMembers, setUnpaidMembers } = useUnpaidMembers()

    useEffect(() => {
        getTransactions(groupId, eventId).then((response) => {
            const paidMembersList = response.filter((member) => member.isPaid)
            const unpaidMembersList = response.filter((member) => !member.isPaid)

            const filteredPaidMembers = paidMembersList.filter((member) => {
                const memberTimestamp = moment(member.timestamp[0])
                const isWithinDateRange =
                    startDate && endDate
                        ? memberTimestamp.isSameOrAfter(startDate) && memberTimestamp.isSameOrBefore(endDate)
                        : true
                if (!isWithinDateRange) unpaidMembersList.push(member)
                return isWithinDateRange
            })

            const sortedPaidMembers = filteredPaidMembers.sort((a, b) => {
                if (sort === 'descend') {
                    return new Date(b.timestamp[0]) - new Date(a.timestamp[0])
                } else {
                    return new Date(a.timestamp[0]) - new Date(b.timestamp[0])
                }
            })

            const finalMembersList = unpaidMembersList.concat(sortedPaidMembers)
            setMembers(finalMembersList)
            setPaidMembers(sortedPaidMembers)
            setUnpaidMembers(unpaidMembersList)
        })
    }, [groupId, eventId, startDate, endDate, sort])

    const handleRowSelectChange = (selectedRowKeys) => {
        // Filter the selected row keys to include only those that correspond to unpaid members
        const filteredSelectedRowKeys = selectedRowKeys.filter((key) => {
            const index = Number(key)
            const member = members[index]
            // Check if the member is in the unpaidMembers array
            return unpaidMembers.some((unpaidMember) => unpaidMember.member._id === member.member._id)
        })

        setSelectedRowKeys(filteredSelectedRowKeys)
        setSelectedMemberIds(filteredSelectedRowKeys.map((key) => members[Number(key)].member._id))
    }

    console.log(selectedMemberIds)

    const columns = [
        {
            title: '순',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
        },
    ]

    const data = members.map((member, index) => ({
        key: index.toString(),
        index: index + 1,
        name: member.member.name,
        isPaid: member.isPaid,
        member: member.member,
    }))

    return (
        <Wrapper>
            <StyledTable
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: selectedRowKeys,
                    onChange: handleRowSelectChange,
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 300 }}
                rowClassName={(record) =>
                    paidMembers.some((paidMember) => paidMember.member._id === record.member._id)
                        ? 'paid-row'
                        : 'unpaid-row'
                }
            />
        </Wrapper>
    )
}

export default EventTransactionResults

const Wrapper = styled.div`
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    margin-top: 20px;
`

const StyledTable = styled(Table)`
    margin-top: 20px;

    tbody tr.paid-row {
        background-color: #d8f0ff;
    }
    tbody tr.unpaid-row {
        background-color: #ffe6e6;
    }
`
