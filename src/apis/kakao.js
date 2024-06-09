import { kakaoAPI } from './index'

export const getKakaoFriends = async () => {
    try {

        return (await kakaoAPI.get('/friends', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('kakaoToken')}`,
            },
        })).data
    } catch (error) {
        console.error('Error fetching Kakao friends:', error)
        throw error
    }
}

export const sendKakaoMessage = async (receiverUuids, template_args) => {
    try {
        const response = await kakaoAPI.post(
            '/friends/message/send',
            new URLSearchParams({
                'receiver_uuids': JSON.stringify(receiverUuids),
                'template_id': 108212,
                'template_args': JSON.stringify(template_args),
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('kakaoToken')}`,
                },
            },
        )
        console.log('Message sent successfully:', response.data)
    } catch (error) {
        console.error('Error sending message:', error)
    }
}