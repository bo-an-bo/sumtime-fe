import React, { useState, useEffect } from 'react'
import { addMember, getMember } from '../../apis/members'
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
    background-color: #003f98;

    @media (max-width: 768px) {
        width: 80px;
        height: 30px;
        font-size: 14px;
    }
`

const AddMember = ({ groupId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [propNames, setPropNames] = useState([])
    const [name, setName] = useState('')
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const data = await getMember(groupId)
                const memberInfo = data.memberInfo || {}
                const initialFormData = {}
                const propNamesArray = [...memberInfo]
                propNamesArray.forEach((propName) => {
                    initialFormData[propName] = memberInfo[propName] || ''
                })

                setFormData(initialFormData)
                setPropNames(propNamesArray)
            } catch (error) {
                console.error('Failed to fetch member data:', error)
            }
        }
        fetchMemberData()
    }, [groupId])

    const isAnyFieldEmpty = () => {
        return propNames.some((propName) => !formData[propName])
    }

    const handleInputChange = (e, propName) => {
        setFormData({
            ...formData,
            [propName]: e.target.value,
        })
    }

    const handleAddMember = async () => {
        setLoading(true)
        await addMember(groupId, name, formData)
        setLoading(false)
        setIsModalOpen(false)
        setIsConfirmationModalVisible(true)
    }

    const handleConfirmationOk = () => {
        setIsConfirmationModalVisible(false)
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
                {propNames.map((propName) => (
                    <StyledInput
                        key={propName}
                        placeholder={propName}
                        value={formData[propName]}
                        onChange={(e) => handleInputChange(e, propName)}
                    />
                ))}
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
                <p>회원 추가가 완료되었습니다.</p>
            </Modal>
        </>
    )
}

AddMember.propTypes = {
    groupId: PropTypes.string.isRequired,
}

export default AddMember
