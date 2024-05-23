import api from './index'

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

