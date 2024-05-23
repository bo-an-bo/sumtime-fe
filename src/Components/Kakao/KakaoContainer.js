import React, { useState } from 'react'
import KakaoFriends from './KakaoFriends'
import KakaoMessage from './KakaoMessage'
import { getKakaoFriends } from '../../apis/kakao'

const KakaoContainer = () => {
    const [friends, setFriends] = useState([])

    const getFriends = async () => {
        const res = await getKakaoFriends()
        setFriends(res.elements) // Adjust based on actual response structure

    }

    return (
        <div>
            <KakaoFriends getFriends={getFriends} />
            <KakaoMessage friends={friends} />
        </div>
    )
}

export default KakaoContainer
