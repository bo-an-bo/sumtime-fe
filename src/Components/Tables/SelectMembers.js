import React, { useEffect, useState } from 'react'
import { getMember } from '../../apis/members'
import MemberList from './MemberList'
import { postEventMember } from '../../apis/event'
import { useEventStore, useTableMemInfo } from '../../store/event'
import { useNavigate } from 'react-router-dom'
import BasicButton from '../Buttons/BasicButton'
import styled from 'styled-components'
import { Modal, Button } from 'antd'

const SelectMembers = () => {
    const [members, setMembers] = useState([])
    const { memName } = useTableMemInfo()
    const { eventId } = useEventStore()
    const groupId = window.location.href.split('/')[4]
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    // member data from Tables

    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [groupId, members])

    const navigate = useNavigate()

    const handleMem = async () => {
        try {
            await postEventMember(groupId, eventId, memName)
            setIsModalVisible(true)
        } catch (error) {
            console.error('멤버 선택에 실패했습니다.', error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleOk = () => {
        setIsModalVisible(false)
        navigate(`/group/${groupId}/showEventList`)
    }

    return (
        <StyledLayout>
            <MemberList groupId={groupId} />
            <StyledBasicButton text="멤버 선택 완료" onClick={handleMem} disabled={isProcessing} />
            <Modal
                title="멤버 선택 완료"
                open={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        확인
                    </Button>,
                ]}
            >
                <p>멤버 선택이 완료되었습니다.</p>
            </Modal>
        </StyledLayout>
    )
}

export default SelectMembers

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    width: 80%;
    @media (max-width: 1200px) {
        width: 90%;
        padding: 8px;
    }

    @media (max-width: 768px) {
        width: 95%;
        padding: 6px;
    }

    @media (max-width: 480px) {
        width: 100%;
        padding: 4px;
    }
`
const StyledBasicButton = styled(BasicButton)`
    margin-top: 20px;
`
