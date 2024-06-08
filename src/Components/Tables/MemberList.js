import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelectedRowKeys, useSelectedRows } from '../../store/member'
import { getMember } from '../../apis/members'
import { useTableMemInfo } from '../../store/event'

const MemberList = ({ groupId }) => {
    const { memName, setMemName } = useTableMemInfo()
    const [members, setMembers] = useState([])
    const [memberKeys, setMemberKeys] = useState([])
    const { setSelectedRows } = useSelectedRows()
    const { selectedRowKeys, setSelectedRowKeys } = useSelectedRowKeys()

    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data.members)
        })
    }, [groupId])

    useEffect(() => {
        const keys = Object.keys(members[0]?.memberInfo || {})
        setMemberKeys(keys)
    }, [members])

    const columns = [
        {
            title: '순',
            dataIndex: 'index',
            width: 40,
        },
        {
            title: '이름',
            dataIndex: 'name',
            width: 100,
        },
        ...memberKeys.map((key) => ({
            title: key,
            dataIndex: key,
            width: 100,
        })),
    ]

    const data = members.map((member, index) => ({
        _id: member._id,
        key: index,
        index: index + 1,
        name: member.name,
        ...member.memberInfo,
    }))

    useEffect(() => {
        // console.log('memName updated:', memName)
    }, [memName])

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)

        const selectedNames = selectedRows.map((row) => row._id)
        setMemName(selectedNames)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const totalColumnsWidth = 230 + memberKeys.length * 150 // Adjust the base width according to fixed column widths

    return (
        <StyledLayout>
            <Wrapper>
                <StyledTable
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ x: totalColumnsWidth, y: 450 }}
                />
            </Wrapper>
        </StyledLayout>
    )
}

const StyledLayout = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const Wrapper = styled.div`
    width: 90%;
    @media (max-width: 1200px) {
        width: 90%;
        padding: 8px;
    }

    @media (max-width: 768px) {
        width: 95%;
        padding: 6px;
    }

    @media (max-width: 480px) {
        width: 100%;
        padding: 0px;
    }
    border-radius: 20px;
    background-color: rgba(0, 62.67, 151.94, 0.04);
`

const StyledTable = styled(Table)`
    .ant-table {
        width: 100%;
        overflow-x: auto;
    }
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
MemberList.propTypes = {
    groupId: PropTypes.string.isRequired,
}
export default MemberList
