import React, { useState, useEffect } from 'react'
import EventCard from '../../Components/Card/EventCard'
import ShowEventMember from './ShowEventMember'
import styled from 'styled-components'
import { useEventMemberStore } from '../../store/member'
// eslint-disable-next-line
import { getMember } from '../../apis/members'
import { useMediaQuery } from 'react-responsive'

const ShowEventList = () => {
    const groupId = window.location.href.split('/')[4]
    // 이벤트 id 값을 배열로 만들어서 가져온다.
    const [selectedEvent, setSelectedEvent] = useState([])
    // eslint-disable-next-line
    const { eventMembers, setEventMembers } = useEventMemberStore()
    const isopen = useMediaQuery({ maxWidth: 1180 })

    useEffect(() => {
        getMember(groupId).then((data) => {
            setEventMembers(data.members)
        })
    }, [groupId, setEventMembers])

    return (
        <StyledPageLayout isopen={isopen}>
            <EventCard groupId={groupId} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
            <ShowEventMember groupId={groupId} selectedEvent={selectedEvent} eventMembers={eventMembers} />
        </StyledPageLayout>
    )
}

const StyledPageLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: ${(props) => (props.isopen ? '150px' : '0')};
`
export default ShowEventList
