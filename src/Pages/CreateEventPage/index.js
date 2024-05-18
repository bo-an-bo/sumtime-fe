import React from 'react'
import CreateEvent from '../../Components/Forms/CreateEvent'
import { useEffect, useState } from 'react'
import { getMember } from '../../apis/members'
// import Tables from '../../Components/Tables/Tables'

const CreateEventPage = () => {
    const [members, setMembers] = useState([])
    const [eventId, setEventId] = useState([])
    const groupId = window.location.href.split('/')[4]
    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [groupId])
    
    return (
        <div>
            <CreateEvent members={members || []} groupId={groupId} eventId={eventId} setEventId={setEventId} />
            
        </div>
    )
}

export default CreateEventPage
