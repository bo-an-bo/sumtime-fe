import React from 'react'
import UploadTransaction from '../../Components/Upload/UploadTranaction'

const UploadTransactions = () => {
    const groupId = window.location.href.split('/')[4]
    return <UploadTransaction groupId={groupId} />
}

export default UploadTransactions
