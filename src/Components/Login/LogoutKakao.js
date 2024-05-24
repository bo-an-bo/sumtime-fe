// LogoutKakao.js
import React from 'react'
import { Button } from 'antd'
import { useAuth } from '../../context/AuthContext'

const LogoutKakao = () => {
    const { setUser } = useAuth()
    const Kakao = window.Kakao || {}

    const kakaoLogout = () => {
        if (Kakao && Kakao.Auth) {
            Kakao.Auth.logout(() => {
                localStorage.removeItem('profileImg')
                localStorage.removeItem('nickname')
                setUser(null)

                console.log('Logged out successfully')
            })
        }
    }

    return <Button onClick={kakaoLogout}>Logout</Button>
}

export default LogoutKakao
