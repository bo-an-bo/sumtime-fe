import React from 'react'
import UploadMember from '../../Components/Upload/UploadMember'

const UploadMembers = () => {
    const groupId = window.location.href.split('/')[4]
    return <UploadMember groupId={groupId} />
}

export default UploadMembers
