// LogoutKakao.js
import React from 'react'
import { Button } from 'antd'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LogoutKakao = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const Kakao = window.Kakao || {}
    const kakaoLogout = () => {
        console.log('Logged out')

        if (Kakao && Kakao.Auth) {
            Kakao.Auth.logout(() => {
                setUser(null)
                localStorage.clear()

                console.log('Logged out successfully')
            })
        }
        if (localStorage.getItem('kakaoToken')) {
            setUser(null)
            localStorage.clear()

        }
        navigate('/')
    }

    return (
        <Button
            type="link"
            onClick={kakaoLogout}
            style={{
                padding: '0',
                height: 'auto',
                lineHeight: 'inherit',
                fontFamily: 'Dotum Bold',
            }}
        >
            로그아웃
        </Button>
    )
}

export default LogoutKakao
