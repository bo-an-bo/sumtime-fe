import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../apis/tranaction'
import { Table } from 'antd'
import styled from 'styled-components'
import KakaoMessage from '../Kakao/KakaoMessage'

const EventTransactionResults = ({ groupId, eventId }) => {
    const [members, setMembers] = useState([])
    const [paidMembers, setPaidMembers] = useState([])
    const [unpaidMembers, setUnpaidMembers] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedMemberIds, setSelectedMemberIds] = useState([])

    useEffect(() => {
        getTransactions(groupId, eventId).then((response) => {
            const paidMembersList = response.filter((member) => member.isPaid)
            const unpaidMembersList = response.filter((member) => !member.isPaid)

            setPaidMembers(paidMembersList)
            setUnpaidMembers(unpaidMembersList)
            setMembers(paidMembersList.concat(unpaidMembersList))
        })
    }, [groupId, eventId])

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
            <KakaoMessage groupId={groupId} eventId={eventId} unpaidMembers={unpaidMembers} />

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

    .ant-table-thead > tr {
        font-family: 'Dotum Bold';
    }

    tbody tr.paid-row {
        background-color: #d8f0ff;
        font-family: 'Dotum Medium';
    }

    tbody tr.unpaid-row {
        background-color: #ffe6e6;
        font-family: 'Dotum Medium';
    }
`
