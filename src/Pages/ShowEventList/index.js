import React from 'react'
import EventCard from '../../Components/Card/EventCard'

const ShowEventList = () => {
    const groupId = window.location.href.split('/')[4]

    return <EventCard groupId={groupId} />
}

export default ShowEventList
