import React, { useState } from 'react'
import { getKakaoFriends, sendKakaoMessage } from '../../apis/kakao'
import { RiKakaoTalkFill } from 'react-icons/ri'

import { Button, message, Modal } from 'antd'
import styled from 'styled-components'
import { getEventDetail } from '../../apis/event'
import { getGroupDetail } from '../../apis/groups'

const KakaoMessage = ({ groupId, eventId, unpaidMembers }) => {
    const [friends, setFriends] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    const getFriends = async () => {
        const res = await getKakaoFriends()
        setFriends(res.elements)
    }
    const unpaidNames = unpaidMembers.length > 0 ? unpaidMembers.map(u => u.member.name) : ['이예림']

    const handleSendMessage = async () => {
        let res
        const getEventInfo = async (groupId, eventId) => {
            const group = await getGroupDetail(groupId)
            const event = await getEventDetail(groupId, eventId)
            return {
                'group': group.name,
                'event': event.name,
                'fee': event.fee,
                'start_date': event.startDate.slice(0, 10),
                'end_date': event.endDate.slice(0, 10),
            }
        }
        const tmpEvent = {
            'group': '소프트웨어학부 소모임',
            'event': '2024 여름 MT',
            'fee': 10000,
            'start_date': '2024.05.23',
            'end_date': '2024.05.25',
        }
        const info = await getEventInfo(groupId, eventId)
        const eventInfo = info ? info : tmpEvent

        // 미납자 uuid 추출
        const filteredUuids = friends
            .filter(friend => unpaidNames.includes(friend.profile_nickname))
            .map(friend => friend.uuid)

        // 카카오 메세지 보내기 5명 제한 -> 반복문
        for (let i = 0; i < filteredUuids.length; i += 5) {
            res = await sendKakaoMessage(filteredUuids.slice(i, i + 5), eventInfo)
        }
        return res
    }

    const showModal = () => {
        getFriends().then()
        setIsModalOpen(true)
    }

    const handleOk = () => {
        handleSendMessage().then()
        messageApi.open({
            type: 'success',
            content: '메세지를 전송하였습니다.',
        }).then()

        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            {contextHolder}
            <KakaoMessageButton onClick={showModal}>
                <RiKakaoTalkFill />
                미납 회원에게 알리기
            </KakaoMessageButton>
            <Modal title="카카오톡 메세지 전송" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={[
                       <KakaoModalButton key="cancel" onClick={handleCancel}>
                           돌아가기
                       </KakaoModalButton>,
                       <KakaoModalButton key="submit" type="primary" onClick={handleOk} style={{
                           backgroundColor: '#fee500', color: 'black',
                       }}>
                           전송하기
                       </KakaoModalButton>,
                   ]}
                   style={{ fontFamily: 'Dotum Medium' }}
            >
                <>
                    아래의 회원들에게 메세지를 보냅니다.
                    <p>미납회원: {unpaidNames}</p>
                </>
            </Modal>
        </>
    )
}

const KakaoMessageButton = styled(Button)`
    background-color: #fee500;
    color: black;
    font-weight: bold;
    font-family: "Dotum Bold", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`

const KakaoModalButton = styled(Button)`
    color: black;
    font-weight: bold;
    font-family: "Dotum Bold", sans-serif;
`

export default KakaoMessage
