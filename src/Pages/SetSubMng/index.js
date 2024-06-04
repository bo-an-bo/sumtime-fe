import React from 'react'
import SelectManager from '../../Components/Tables/SelectManager'

const SetSubMng = () => {
    const groupId = window.location.href.split('/')[4]

    return <SelectManager groupId={groupId} />
}

export default SetSubMng
