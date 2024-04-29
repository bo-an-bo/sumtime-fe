import React from 'react'
import CreateEvent from '../../Components/Forms/CreateEvent'
const CreateEventPage = () => {
    const groupId = window.location.href.split('/')[4]

    return <CreateEvent groupId={groupId} />
}

export default CreateEventPage
