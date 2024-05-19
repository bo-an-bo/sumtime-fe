import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelectedRowKeys, useSelectedRows } from '../../store/member'
//getGroupDetail로 변경
import { getMember } from '../../apis/members'
import { useTableMemInfo } from '../../store/event'

const Tables = ({ groupId }) => {
    const { memName, setMemName } = useTableMemInfo()
    const [members, setMembers] = useState([])
    const [memberKeys, setMemberKeys] = useState([])
    const { setSelectedRows } = useSelectedRows()

    const { selectedRowKeys, setSelectedRowKeys } = useSelectedRowKeys()

    // const { setDeleteMemberIds } = useDeleteMemberIds()

    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
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
        },
        {
            title: '이름',
            dataIndex: 'name',
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

    // const [selectedRowKeys, setSelectedRowKeys] = useState([])
    // const [selectedRows, setSelectedRows] = useState([])
    // const [deleteMemberIds, setDeleteMemberIds] = useState([])

    // useEffect(() => {
    //     const ids = selectedRows.map((row) => row._id)

    //     setDeleteMemberIds(ids)
    // }, [selectedRows])

    useEffect(() => {
        // console.log('memName updated:', memName)
    }, [memName])

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)

        // 가져올 데이터
        const selectedNames = selectedRows.map((row) => row._id)
        setMemName(selectedNames)
        // console.log('rows', selectedRows)
        // console.log('가져오는 데이터', memName)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <StyledLayout>
            <Wrapper>
                <StyledTable
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ y: 450 }}
                />
            </Wrapper>
        </StyledLayout>
    )
}

const StyledLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    // margin-left: 8%;
    margin-top: 2%;
`
const Wrapper = styled.div`
    width: 1000px;
    border-radius: 20px;
    background-color: rgba(0, 62.67, 151.94, 0.04);
    // max-width: 750px;
    // margin-left: 100px;
    // margin-top: 20px;
    // margin: 0 15%;
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
Tables.propTypes = {
    groupId: PropTypes.string.isRequired,
}
export default Tables
