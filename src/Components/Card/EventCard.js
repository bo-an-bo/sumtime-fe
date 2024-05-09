import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import { getEvent } from '../../apis/event'
import styled from 'styled-components'

const EventCard = ({ groupId }) => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data.filter((event) => event !== null))
        })
    }, [groupId])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const items = events.map((event, i) => ({
        key: i,
        label: events[i].name,
        children: (
            <div>
                <p>
                    <strong>설명</strong>: {events[i].description}
                </p>
                <p>
                    <strong>요금</strong>:{' '}
                    {typeof events[i].fee === 'number' ? events[i].fee.toLocaleString() + '원' : events[i].fee}
                </p>

                <p>
                    <strong>이벤트 기한</strong>: {formatDate(events[i].endDate)}
                </p>
                <p>
                    <strong>결제 기한</strong>: {formatDate(events[i].transactionEndDate)}
                </p>
            </div>
        ),
    }))

    return <StyledCollapse accordion bordered={false} items={items}></StyledCollapse>
}

const StyledCollapse = styled(Collapse)`
    width: 60%;
    margin-left: 100px;
    margin-top: 50px;
    padding: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
    overflow: auto;
    max-height: 450px;
`

export default EventCard
