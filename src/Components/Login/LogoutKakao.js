import React from 'react'
import { logoutKakao } from '../../apis/auth'
import { Button } from 'antd'

const LogoutKakao = ({ onLogout }) => {
    const handleLogout = async () => {
        try {
            await logoutKakao(localStorage.getItem('access_token'))

            localStorage.removeItem('access_token')
            localStorage.removeItem('nickname')
            if (onLogout) onLogout()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}
export default LogoutKakao