import React, { useEffect, useState } from 'react'
import { getEvent } from '../../apis/event'
import { Table } from 'antd'
import styled from 'styled-components'
import EventTransactionResults from './EventTransactionResults'

const EventTransaction = ({ groupId }) => {
    const [events, setEvents] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([0])
    const [selectedEvent, setSelectedEvent] = useState(null)

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvent(groupId)
            const filteredEvents = data.filter((event) => event !== null)
            setEvents(filteredEvents)

            if (filteredEvents.length > 0) {
                setSelectedRowKeys([0]) // Automatically select the first row
                setSelectedEvent(filteredEvents[0]) // Automatically select the first event
            }
        }

        fetchEvents()
    }, [groupId])

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
        setSelectedRowKeys([key])
        setSelectedEvent(events[key])
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
                scroll={{ y: 250 }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                rowClassName={rowClassName}
            />
            <EventWrapper>
                {selectedEvent && <EventTransactionResults groupId={groupId} eventId={selectedEvent._id} />}
            </EventWrapper>
        </Wrapper>
    )
}

export default EventTransaction

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const EventWrapper = styled.div`
    width: 100%;
    @media (max-width: 768px) {
        margin-top: 20px;
    }
`

const StyledTable = styled(Table)`
    margin-top: 100px;
    width: 50%;
    @media (max-width: 768px) {
        width: 100%;
        margin-top: 50px;
    }

    tbody tr.selected-row {
        background-color: #f0f0f0;
        font-family: 'Dotum Bold';
    }

    .ant-table-thead > tr {
        font-family: 'Dotum Bold';
    }

    .ant-table-tbody > tr {
        font-family: 'Dotum Light';
    }

    .ant-table-tbody > tr:hover {
        cursor: pointer;
        font-family: 'Dotum Bold';
    }
`
