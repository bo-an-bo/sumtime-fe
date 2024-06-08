import React, { useState } from 'react'
import { Button, Modal, message } from 'antd'
import PropTypes from 'prop-types'
import { deleteMember } from '../../apis/members'
import styled from 'styled-components'

const StyledAddButton = styled(Button)`
    font-family: 'Dotum Light';
    font-size: 18px;
    width: 100px;
    height: 40px;
    background-color: #003f98;

    @media (max-width: 768px) {
        width: 80px;
        height: 30px;
        font-size: 14px;
    }
`

const DeleteMember = ({ groupId, memberIds }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        await deleteMember(groupId, memberIds)
        setIsDeleting(false)
        setIsModalVisible(false)
        setIsConfirmationModalVisible(true)
    }

    const showDeleteConfirm = () => {
        if (memberIds.length === 0) {
            message.error('선택한 회원이 없습니다.')
            return
        }
        setIsModalVisible(true)
    }

    const handleConfirmationOk = () => {
        setIsConfirmationModalVisible(false)
        window.location.reload()
    }

    return (
        <>
            <StyledAddButton type="primary" onClick={showDeleteConfirm} disabled={memberIds.length === 0}>
                회원 삭제
            </StyledAddButton>
            <Modal
                title="정말 삭제하시겠습니까?"
                open={isModalVisible}
                onOk={handleDelete}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={isDeleting}
                okText="삭제"
                cancelText="아니요"
            >
                <p>선택한 회원을 삭제하시겠습니까?</p>
            </Modal>
            <Modal
                title="알림"
                open={isConfirmationModalVisible}
                onOk={handleConfirmationOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleConfirmationOk}>
                        확인
                    </Button>,
                ]}
            >
                <p>회원 삭제가 완료되었습니다.</p>
            </Modal>
        </>
    )
}

DeleteMember.propTypes = {
    groupId: PropTypes.string.isRequired,
    memberIds: PropTypes.array.isRequired,
}

export default DeleteMember
