import React from 'react'
// import styled from 'styled-components'
// eslint-disable-next-line
import { deleteGroup } from '../../apis/groups'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const DeleteGrp = (groupId) => {
    // eslint-disable-next-line
    const navigate = useNavigate()
    console.log(groupId)
    const handleDeleteButton = async () => {
        try {
            // const deletedgroup = await deleteGroup(groupId)
            // console.log('delete 완료입니다.', deletedgroup)
            // alert('삭제되었습니다.')
            // navigate('/')
        } catch (error) {
            alert('삭제 실패했습니다.')
        }
    }
    return (
        <div>
            <Button onClick={handleDeleteButton}>삭제</Button>
        </div>
    )
}

export default DeleteGrp
