import { Button } from 'antd'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { signOutServer } from '../../apis/auth'
import { useNavigate } from 'react-router-dom'

const SignOutServer = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const serverSignout = async () => {
        try {
            setUser(null)
            localStorage.clear()
            await signOutServer()
        } catch (error) {
            console.error('Server signout error:', error.response ? error.response.data : error.message)
        }
        navigate('/')
        location.reload()
    }

    return <Button type="link" onClick={serverSignout}
                   style={{ padding: '0', height: 'auto', lineHeight: 'inherit', fontFamily: 'Dotum Bold' }}>회원
        탈퇴</Button>
}

export default SignOutServer