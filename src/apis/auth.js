import api from './index'

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

export const logoutKakao = async (token) => {
    try {
        const response = await api.post(`/auth/kakao/logout?kakaoToken=${encodeURIComponent(token)}`)
        console.log('kakao logout api response', response)
        return response
    } catch (error) {
        console.error('Error kakao logout:', error.response ? error.response.data : error.message)
        throw error
    }
}

