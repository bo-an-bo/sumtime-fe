import React from 'react'
import CreateEvent from '../../Components/Forms/CreateEvent'
import { useEffect, useState } from 'react'
import { getMember } from '../../apis/members'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
        >
            <StyledLayout>
                <CreateEvent members={members || []} groupId={groupId} eventId={eventId} setEventId={setEventId} />
            </StyledLayout>
        </motion.div>
    )
}

const StyledLayout = styled.div`
    width: 100%;
`
export default CreateEventPage
