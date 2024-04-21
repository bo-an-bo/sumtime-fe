import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddMemberButton from '../Buttons/AddMemberButton'
import DeleteMemberButton from '../Buttons/DeleteMemberButton'

const Tables = ({ members, groupId }) => {
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
            title: '학번',
            dataIndex: 'studentId',
        },
        {
            title: '전화번호',
            dataIndex: 'phoneNumber',
        },
        {
            title: '비고',
            dataIndex: 'remark',
        },
    ]

    const data = []
    for (let i = 0; i < members.length; i++) {
        data.push({
            _id: members[i]._id,
            key: i,
            index: i + 1,
            name: members[i].name,
            studentId: members[i].memberInfo.studentId,
            phoneNumber: members[i].memberInfo.phoneNumber,
            remark: members[i].memberInfo.remark,
        })
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteMemberIds, setDeleteMemberIds] = useState([])

    useEffect(() => {
        const ids = selectedRows.map((row) => row._id)
        setDeleteMemberIds(ids)
    }, [selectedRows])

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <>
            <AddMemberButton groupId={groupId} />
            <DeleteMemberButton groupId={groupId} memberIds={deleteMemberIds} />

            <StyledTable
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 450 }}
            />
        </>
    )
}

const StyledTable = styled(Table)`
    .ant-table-row {
        background-color: ${(props) =>
            props.hoveredRow === props.rowKey ? 'rgba(0, 62.67, 151.94, 0.04)' : 'transparent'};
    }
    .ant-table-thead > tr > th {
        border-bottom: 2px solid #d9d9d9;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
        background-color: rgba(0, 62.67, 151.94, 0.04);
    }
    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #d9d9d9;
        font-size: 15px;
        text-align: center;
        padding: 10px;
        background-color: rgba(0, 62.67, 151.94, 0.04);
    }
    .ant-table-tbody > tr:last-child > td {
        border-bottom: none;
    }
`
Tables.propTypes = {
    members: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            memberInfo: PropTypes.shape({
                studentId: PropTypes.string.isRequired,
                phoneNumber: PropTypes.string.isRequired,
                remark: PropTypes.string,
            }),
        }),
    ).isRequired,
    groupId: PropTypes.string.isRequired,
}
export default Tables
