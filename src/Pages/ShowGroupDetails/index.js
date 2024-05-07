import React from 'react'
import Tables from '../../Components/Tables/Tables'

const ShowGroupDetails = () => {
    const groupId = window.location.href.split('/')[4]

    return (
        <div>
            <Tables groupId={groupId} />
        </div>
    )
}

export default ShowGroupDetails
