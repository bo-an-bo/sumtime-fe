import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../apis/tranaction'
import { Button, Table, Tag } from 'antd'
import styled from 'styled-components'
import KakaoMessage from '../Kakao/KakaoMessage'

const EventTransactionResults = ({ groupId, eventId }) => {
    const [members, setMembers] = useState([])
    const [paidMembers, setPaidMembers] = useState([])
    const [unpaidMembers, setUnpaidMembers] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedMemberNames, setSelectedMemberNames] = useState([])
    const [isButtonClicked, setIsButtonClicked] = useState(false)

    useEffect(() => {
        getTransactions(groupId, eventId).then((response) => {
            const paidMembersList = response.filter((member) => member.isPaid)
            const unpaidMembersList = response.filter((member) => !member.isPaid)

            setPaidMembers(paidMembersList)
            setUnpaidMembers(unpaidMembersList)
            setMembers(paidMembersList.concat(unpaidMembersList))
            setSelectedMemberNames([])
            setSelectedRowKeys([])
        })
    }, [groupId, eventId])

    const handleRowSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedMemberNames(selectedRowKeys.map((key) => members[Number(key)].member.name))
    }

    const columns = [
        {
            title: '번호',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '납부 여부',
            dataIndex: 'isPaid',
            key: 'paid',
            render: isPaid => (
                <Tag color={isPaid ? 'geekblue' : 'volcano'}
                     style={{ fontFamily: 'Dotum Medium' }}>{isPaid ? '납부 완료' : '미납'}</Tag>
            ),
        },
    ]

    const data = members.map((member, index) => ({
        key: index.toString(),
        index: index + 1,
        name: member.member.name,
        isPaid: member.isPaid,
        member: member.member,
    }))

    useEffect(() => {
        console.log(isButtonClicked)
    }, [isButtonClicked])

    const handleUnpaidMembers = () => {
        if (isButtonClicked) {
            setSelectedRowKeys([])
            setSelectedMemberNames([])
            setIsButtonClicked(false)
        } else {
            const unpaidKeys = unpaidMembers.map((member) => {
                const index = members.findIndex(m => m.member._id === member.member._id)
                return index.toString()
            })

            setSelectedRowKeys(unpaidKeys)
            setSelectedMemberNames(unpaidKeys.map((key) => members[Number(key)].member.name))
            setIsButtonClicked(true)
        }
    }


    return (
        <Wrapper>
            <ButtonWrapper>
                <Button style={{ fontFamily: 'Dotum Bold' }} onClick={handleUnpaidMembers}>미납 회원 선택</Button>
            </ButtonWrapper>
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
            <KakaoWrapper>
                <KakaoMessage groupId={groupId} eventId={eventId} selectedMemberNames={selectedMemberNames} />
            </KakaoWrapper>
        </Wrapper>
    )
}

export default EventTransactionResults

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    margin-top: 20px;
    width: 25%;
`
const KakaoWrapper = styled.div`
    display: flex;
    justify-content: center;

`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`
const StyledTable = styled(Table)`
    margin-top: 20px;

    .ant-table-thead > tr {
        font-family: 'Dotum Bold', sans-serif;
    }

    .ant-table-body {
        font-family: 'Dotum Medium', sans-serif;


    }

    //
    //tbody tr.paid-row {
    //    background-color: #d8f0ff; // 기본 색상
    //    font-family: 'Dotum Medium';
    //}
    //
    //tbody tr.unpaid-row {
    //    background-color: #ffe6e6; // 기본 색상
    //    font-family: 'Dotum Medium';
    //}
`
