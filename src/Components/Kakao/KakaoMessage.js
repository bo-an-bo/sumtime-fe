import React, { useState } from 'react'
import { getKakaoFriends, sendKakaoMessage } from '../../apis/kakao'
import { RiKakaoTalkFill } from 'react-icons/ri'

import { Button, message, Modal } from 'antd'
import styled from 'styled-components'

const KakaoMessage = () => {
    const [friends, setFriends] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    const getFriends = async () => {
        const res = await getKakaoFriends()
        setFriends(res.elements)
    }

    const minap = ['이예림']
    const eventInfo = {
        'group': '소프트웨어학부 소모임',
        'event': '2024 여름 MT',
        'fee': 10000,
        'start_date': '2024.05.23',
        'end_date': '2024.05.25',
    }

    const filteredUuids = friends
        .filter(friend => minap.includes(friend.profile_nickname))
        .map(friend => friend.uuid)

    const handleSendMessage = async () => {
        let res
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
        handleSendMessage()
        messageApi.open({
            type: 'success',
            content: '메세지를 전송하였습니다.',
        })

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
                       ]}>
                    <>
                        아래의 친구들에게 메세지를 보냅니다.
                        <p>미납회원: {minap}</p>
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
