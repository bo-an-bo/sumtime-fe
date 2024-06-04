import React, { useEffect, useState } from 'react'
import { getMember } from '../../apis/members'
import { getGroupDetail } from '../../apis/groups'
import { Table } from 'antd'
import styled from 'styled-components'

const SelectManager = ({ groupId }) => {
    const [members, setMembers] = useState([])
    const [memberKeys, setMemberKeys] = useState([])
    const [owner, setOwner] = useState('')
    const [editors, setEditors] = useState([])
    const [viewers, setViewers] = useState([])

    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data.members)
        })
    }, [groupId])

    useEffect(() => {
        getGroupDetail(groupId).then((data) => {
            setOwner(data.auth.owner)
            setEditors(data.auth.editors)
            setViewers(data.auth.viewers)
        })
    }, [groupId])

    console.log('owner', owner)
    console.log('editor', editors)
    console.log('viewer', viewers)

    useEffect(() => {
        const keys = Object.keys(members[0]?.memberInfo || {})
        setMemberKeys(keys)
    }, [members])

    const columns = [
        {
            title: '순',
            dataIndex: 'index',
        },
        {
            title: '이름',
            dataIndex: 'name',
        },
        {
            title: '역할',
            dataIndex: 'role',
        },
        ...memberKeys.map((key) => ({
            title: key,
            dataIndex: key,
        })),
    ]

    const data = []
    for (let i = 0; i < members.length; i++) {
        data.push({
            _id: members[i]._id,
            key: i,
            index: i + 1,
            name: members[i].name,
            ...members[i].memberInfo,
        })
    }

    return (
        <StyledLayout>
            <Wrapper>
                <StyledTable columns={columns} dataSource={data} pagination={false} scroll={{ y: 450 }} />
            </Wrapper>
        </StyledLayout>
    )
}

export default SelectManager

const StyledLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const Wrapper = styled.div`
    width: 100%;
    border-radius: 20px;
    // background-color: rgba(0, 62.67, 151.94, 0.04);
`

const StyledTable = styled(Table)`
    .ant-table-thead > tr > th {
        border-bottom: 2px solid #d9d9d9;
        font-size: 16px;
        // font-weight: 700;
        text-align: center;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Bold', 'serif';
    }

    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #d9d9d9;
        font-size: 15px;
        text-align: center;
        padding: 10px;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Medium', 'serif';
    }

    .ant-table-tbody > tr:last-child > td {
        border-bottom: none;
    }
`
