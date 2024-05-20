import React, { useState, useEffect } from 'react'
import { useDayStore, useSort } from '../../store/event'
import { getTransactions } from '../../apis/tranaction'
import { Table } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

const EventTransactionResults = ({ eventId }) => {
    const groupId = window.location.href.split('/')[4]
    const { startDate, endDate } = useDayStore()
    const { sort } = useSort()
    const [members, setMembers] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedMemberIds, setSelectedMemberIds] = useState([])

    useEffect(() => {
        getTransactions(groupId, eventId).then((response) => {
            const filteredMembers = response.filter((member) => {
                const memberTimestamp = moment(member.timestamp[0])
                const isWithinDateRange =
                    startDate && endDate
                        ? memberTimestamp.isSameOrAfter(startDate) && memberTimestamp.isSameOrBefore(endDate)
                        : true
                return isWithinDateRange
            })
            const sortedMembers = filteredMembers.sort((a, b) => {
                if (sort === 'descend') {
                    return new Date(b.timestamp[0]) - new Date(a.timestamp[0])
                } else {
                    return new Date(a.timestamp[0]) - new Date(b.timestamp[0])
                }
            })
            setMembers(sortedMembers)
        })
    }, [groupId, eventId, startDate, endDate, sort])

    const handleRowSelectChange = (selectedRowKeys) => {
        const filteredSelectedRowKeys = selectedRowKeys.filter((key) => {
            const index = Number(key)
            return members[index] && members[index].isPaid === false
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
                rowClassName={(record) => (record.isPaid ? 'paid-row' : 'unpaid-row')}
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
