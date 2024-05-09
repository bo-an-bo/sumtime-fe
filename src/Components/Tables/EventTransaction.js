import React, { useState, useEffect } from 'react'
import { getEvent } from '../../apis/event'
import { Table } from 'antd'
import styled from 'styled-components'

const EventTransaction = ({ groupId }) => {
    const [events, setEvents] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState('')
    const [selectedEventId, setSelectedEventId] = useState('')

    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data.filter((event) => event !== null))
        })
    }, [groupId])

    useEffect(() => {
        const ids = selectedRows.map((row) => row._id)
        setSelectedEventId(ids)
    }, [selectedRows])

    console.log(selectedEventId)

    const columns = [
        {
            title: '순',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '이벤트명',
            dataIndex: 'name',
            key: 'name',
        },
        // Add more columns as needed
    ]

    const data = events.map((event, index) => ({
        _id: event._id,
        key: index,
        index: index + 1,
        name: event.name,
    }))

    const handleRowClick = (record) => {
        const { key } = record
        const index = selectedRowKeys.indexOf(key)
        if (index === -1) {
            setSelectedRowKeys([key])
            setSelectedRows([record])
        } else {
            setSelectedRowKeys([])
            setSelectedRows([])
        }
    }

    const rowClassName = (record) => {
        return selectedRowKeys.includes(record.key) ? 'selected-row' : ''
    }

    return (
        <Wrapper>
            <h1>이벤트 목록</h1>
            <StyledTable
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ x: 300 }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                rowClassName={rowClassName}
            />
        </Wrapper>
    )
}

export default EventTransaction

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledTable = styled(Table)`
    margin-top: 20px;

    tbody tr.selected-row {
        background-color: #f0f0f0;
    }

    tbody tr:hover {
        cursor: pointer;
    }
`
