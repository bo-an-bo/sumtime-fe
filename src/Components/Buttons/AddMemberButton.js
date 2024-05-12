import React, { useState } from 'react'
import { addMember } from '../../apis/members'
import { Button, Modal, Input } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledInput = styled(Input)`
    margin-bottom: 5px;
`

const StyledAddButton = styled(Button)`
    font-family: 'Dotum Light';
    font-size: 18px;
    width: 100px;
    height: 40px;
    margin: 10px 10px 0 0;
    background-color: #003f98;
`

const AddMember = ({ groupId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState('')
    const [studentId, setStudentId] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)

    const isAnyFieldEmpty = () => {
        return !name || !studentId || !email || !phoneNumber
    }

    const handleAddMember = async () => {
        setLoading(true)
        await addMember(groupId, name, { studentId, email, phoneNumber })
        setLoading(false)
        setIsModalOpen(false)
        alert('회원 추가가 완료되었습니다.')
        window.location.reload()
    }

    return (
        <>
            <StyledAddButton type="primary" onClick={() => setIsModalOpen(true)}>
                회원 추가
            </StyledAddButton>
            <Modal
                title="회원 추가"
                open={isModalOpen}
                onOk={handleAddMember}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={loading}
                okButtonProps={{ disabled: isAnyFieldEmpty() }}
            >
                <StyledInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                <StyledInput placeholder="학번" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                <StyledInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                <StyledInput
                    placeholder="전화번호"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </Modal>
        </>
    )
}

AddMember.propTypes = {
    groupId: PropTypes.string.isRequired,
}

export default AddMember
