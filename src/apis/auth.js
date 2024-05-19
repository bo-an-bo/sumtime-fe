import api from './index'
import authInstance from './authInstance'

export const loginKakao = async (token) => {
    try {
        const response = await api.post(`/auth/kakao/login?kakaoToken=${encodeURIComponent(token)}`)
        console.log('kakao login api response', response)
        return response
    } catch (error) {
        console.error('Error kakao login:', error.response ? error.response.data : error.message)
        throw error
    }
}

export const logoutKakaoHeader = async () => {
    try {
        const response = await authInstance.post(`/auth/kakao/logout/header`)
        console.log('kakao login api response', response)
        return response
    } catch (error) {
        console.error('Error kakao login:', error.response ? error.response.data : error.message)
        throw error
    }
}

