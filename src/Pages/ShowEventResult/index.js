import React from 'react'
import EventTransaction from '../../Components/Tables/EventTransaction'

const ShowEventResult = () => {
    const groupId = window.location.href.split('/')[4]
    return <EventTransaction groupId={groupId} />
}

export default ShowEventResult
