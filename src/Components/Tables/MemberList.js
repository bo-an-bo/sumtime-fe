import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddMemberButton from '../Buttons/AddMemberButton'
import DeleteMemberButton from '../Buttons/DeleteMemberButton'
//getGroupDetail로 변경
import { getMember } from '../../apis/members'

const Tables = ({ groupId }) => {
    const [members, setMembers] = useState([])
    const [memberKeys, setMemberKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [deleteMemberIds, setDeleteMemberIds] = useState([])

    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [groupId])

    useEffect(() => {
        const keys = Object.keys(members[0]?.memberInfo || {})
        setMemberKeys(keys)
    }, [members])

    useEffect(() => {
        const ids = selectedRows.map((row) => row._id)

        setDeleteMemberIds(ids)
    }, [selectedRows])

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

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <StyledLayout>
            <ButtonWrapper>
                <AddMemberButton groupId={groupId} />
                <DeleteMemberButton groupId={groupId} memberIds={deleteMemberIds} />
            </ButtonWrapper>
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
    margin-left: 8%;
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
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    // padding: 10px;
    font-family: 'Dotum Light';
    margin-bottom: 2%;
`

const StyledTable = styled(Table)`
    .ant-table-row {
        background-color: ${(props) =>
            props.hoveredRow === props.rowKey ? 'rgba(0, 62.67, 151.94, 0.04)' : 'transparent'};
    }
    .ant-table-thead > tr > th {
        border-bottom: 2px solid #d9d9d9;
        font-size: 16px;
        // font-weight: 700;
        text-align: center;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Bold';
    }
    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #d9d9d9;
        font-size: 15px;
        text-align: center;
        padding: 10px;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Medium';
    }
    .ant-table-tbody > tr:last-child > td {
        border-bottom: none;
    }
`
Tables.propTypes = {
    groupId: PropTypes.string.isRequired,
}
export default Tables
