import React from 'react'
import CreateEvent from '../../Components/Forms/CreateEvent'
import { useEffect, useState } from 'react'
import { getMember } from '../../apis/members'

const CreateEventPage = () => {
    const [members, setMembers] = useState([])
    const groupId = window.location.href.split('/')[4]
    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [groupId])
    return <CreateEvent members={members || []} groupId={groupId} />
}

export default CreateEventPage
