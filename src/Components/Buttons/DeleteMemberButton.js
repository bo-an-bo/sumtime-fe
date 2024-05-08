import React from 'react'
import { Button, Popconfirm, message } from 'antd'
import PropTypes from 'prop-types'
import { deleteMember } from '../../apis/members'
import styled from 'styled-components'
const StyledAddButton = styled(Button)`
    font-family: 'Dotum Light';
    font-size: 18px;
    width: 100px;
    height: 40px;
    margin: 10px 10px 0 0;
    background-color: #003f98;
`

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
            <StyledAddButton type="primary">회원 삭제</StyledAddButton>
        </Popconfirm>
    )
}

DeleteMember.propTypes = {
    groupId: PropTypes.string.isRequired,
    memberIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DeleteMember
