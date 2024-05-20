import React, { useState, useEffect } from 'react'
import { getEvent } from '../../apis/event'
import { Table } from 'antd'
import styled from 'styled-components'
import { useEventStore } from '../../store/event'

const EventTransaction = ({ groupId }) => {
    const [events, setEvents] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const setSelectedEventId = useEventStore((state) => state.setEventId)

    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data.filter((event) => event !== null))
        })
    }, [groupId])

    useEffect(() => {
        if (events.length > 0 && selectedRowKeys.length === 0) {
            setSelectedRowKeys([0]) // Automatically select the first row
        }
    }, [events, selectedRowKeys, setSelectedRowKeys])

    useEffect(() => {
        const ids = selectedRowKeys.map((key) => events[key]?._id)
        setSelectedEventId(ids)
    }, [selectedRowKeys, events, setSelectedEventId])

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
        // 필요한 경우 더 많은 컬럼 추가
    ]

    const data = events.map((event, index) => ({
        _id: event._id,
        key: index,
        index: index + 1,
        name: event.name,
    }))

    const handleRowClick = (record) => {
        const { key } = record
        if (selectedRowKeys.includes(key)) {
            setSelectedRowKeys([])
        } else {
            setSelectedRowKeys([key])
        }
    }

    const rowClassName = (record) => {
        return selectedRowKeys.includes(record.key) ? 'selected-row' : ''
    }

    return (
        <Wrapper>
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
    margin-top: 100px;

    tbody tr.selected-row {
        background-color: #f0f0f0;
    }

    tbody tr:hover {
        cursor: pointer;
    }
`
