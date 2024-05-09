import React from 'react'
import { Button, Popconfirm, message } from 'antd'
import PropTypes from 'prop-types'
import { deleteMember } from '../../apis/members'

const DeleteMember = ({ groupId, memberIds }) => {
    const handleDelete = async () => {
        await deleteMember(groupId, memberIds)
        window.location.reload()
    }
    const confirmDelete = () => {
        if (memberIds.length === 0) {
            message.error('선택한 회원이 없습니다.')
            return
        }
        handleDelete()
    }
    return (
        <Popconfirm
            title="정말 삭제하시겠습니까?"
            onConfirm={confirmDelete}
            okText="삭제"
            cancelText="아니요"
            disabled={memberIds.length === 0}
        >
            <Button type="primary">회원 삭제</Button>
        </Popconfirm>
    )
}

DeleteMember.propTypes = {
    groupId: PropTypes.string.isRequired,
    memberIds: PropTypes.array.isRequired,
}

export default DeleteMember
