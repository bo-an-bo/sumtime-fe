import api from './index'
import axios from 'axios'

export const loginServer = async (token) => {
    try {
        const response = await api.post(`/auth/login?kakaoToken=${encodeURIComponent(token)}`)
        console.log('server login api response', response)
        return response
    } catch (error) {
        console.error('server kakao login:', error.response ? error.response.data : error.message)
        throw error
    }
}

export const kakaoFriends = async (token) => {
    try {
        const res = await axios.get('https://kapi.kakao.com/v1/api/talk/friends', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        return res.data
    } catch (error) {
        console.error('Error fetching Kakao friends:', error)
        throw error
    }
}

export const sendKakaoMessage = async (token, receiverUuids, template_args) => {
    try {
        const response = await axios.post(
            'https://kapi.kakao.com/v1/api/talk/friends/message/send',
            new URLSearchParams({
                'receiver_uuids': JSON.stringify(receiverUuids),
                'template_id': 108212,
                'template_args': JSON.stringify(template_args),
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            },
        )
        console.log('Message sent successfully:', response.data)
    } catch (error) {
        console.error('Error sending message:', error)
    }
}