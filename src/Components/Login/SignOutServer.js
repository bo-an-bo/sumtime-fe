import { Button } from 'antd'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { signOutServer } from '../../apis/auth'

const SignOutServer = () => {
    const { setUser } = useAuth()

    const serverSignout = async () => {
        try {
            setUser(null)
            localStorage.clear()
            await signOutServer()
            location.reload()
        } catch (error) {
            console.error('Server signout error:', error.response ? error.response.data : error.message)
        }
    }

    return <Button onClick={serverSignout}>로그아웃 및 회원 탈퇴</Button>
}

export default SignOutServer