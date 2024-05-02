import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd'
import { getEvent } from '../../apis/event'
import styled from 'styled-components'

const { Panel } = Collapse

const EventCard = ({ groupId }) => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        getEvent(groupId).then((data) => {
            setEvents(data)
        })
    }, [groupId])

    return (
        <StyledCollapse accordion bordered={false}>
            {events.map((event) => (
                <Panel header={event.name} key={event._id}>
                    <p>
                        <strong>설명: </strong> {event.description}
                    </p>
                    <p>
                        <strong>회비: </strong> {event.fee}
                    </p>
                </Panel>
            ))}
        </StyledCollapse>
    )
}

const StyledCollapse = styled(Collapse)`
    width: 60%;
    margin-top: 100px;
    padding: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
`

export default EventCard
