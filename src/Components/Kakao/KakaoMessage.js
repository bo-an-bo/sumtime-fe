import React, { useMemo } from 'react'
import { sendKakaoMessage } from '../../apis/auth'

const KakaoMessage = ({ friends }) => {
    const Kakao = useMemo(() => window.Kakao || {}, [])
    const minap = ['이예림', '조준호', '박근형']
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

    const handleSendMessage = () => {
        sendKakaoMessage(Kakao.Auth.getAccessToken(), filteredUuids, eventInfo)
    }


    return (
        <div>
            {filteredUuids.length > 0 ? (
                <div>
                    아래의 친구들에게 메세지를 보냅니다.
                    <p>미납회원: {minap}</p>
                    <p>미납 알림 보낼 카카오톡 친구: {filteredUuids}</p>
                    <button onClick={handleSendMessage}>메세지 보내기</button>
                </div>
            ) : null
            }
        </div>
    )
}

export default KakaoMessage
