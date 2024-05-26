import React from 'react'
import CreateEvent from '../../Components/Forms/CreateEvent'
import { useEffect, useState } from 'react'
import { getMember } from '../../apis/members'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'
// import Tables from '../../Components/Tables/Tables'

const CreateEventPage = () => {
    const [members, setMembers] = useState([])
    const [eventId, setEventId] = useState([])
    const groupId = window.location.href.split('/')[4]
    const isopen = useMediaQuery({ maxWidth: 1180 })
    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [groupId])

    return (
        <StyledLayout isopen={isopen}>
            <CreateEvent members={members || []} groupId={groupId} eventId={eventId} setEventId={setEventId} />
        </StyledLayout>
    )
}

const StyledLayout = styled.div`
    margin-top: ${(props) => (props.isopen ? '150px' : '0')};
`
export default CreateEventPage
