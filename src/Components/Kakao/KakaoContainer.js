import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { kakaoFriends } from '../../apis/auth'
import KakaoFriends from './KakaoFriends'
import KakaoMessage from './KakaoMessage'

const KakaoContainer = () => {
    const [friends, setFriends] = useState([])
    const [error, setError] = useState(null)

    const Kakao = useMemo(() => window.Kakao || {}, [])

    const initKakao = useCallback(() => {
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY)
            console.log('Kakao SDK initialized:', Kakao.isInitialized())
        }
    }, [Kakao])

    useEffect(() => {
        initKakao()
    }, [initKakao])

    const getFriends = async () => {
        try {
            const res = await kakaoFriends(Kakao.Auth.getAccessToken())
            setFriends(res.elements) // Adjust based on actual response structure
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div>
            <KakaoFriends getFriends={getFriends} />
            <KakaoMessage friends={friends} />
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}

export default KakaoContainer
