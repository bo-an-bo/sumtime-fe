import React from 'react'
import MemberList from '../../Components/Tables/MemberList'

const ShowGroupDetails = () => {
    const groupId = window.location.href.split('/')[4]

    return (
        <div>
            <MemberList groupId={groupId} />
        </div>
    )
}

export default ShowGroupDetails
