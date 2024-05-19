import React from 'react'
import KakaoLogin from 'react-kakao-login'
import { loginKakao } from '../../apis/auth'

const SocialKakao = () => {
    const kakaoClientId = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY

    const kakaoOnSuccess = async (data) => {
        try {
            const idToken = data.response.access_token
            const loginResponse = await loginKakao(idToken)
            console.log('loginResponse', loginResponse)
            // 액세스 토큰을 로컬 스토리지에 저장
            localStorage.setItem('access_token', idToken)
            localStorage.setItem('user_info', JSON.stringify(loginResponse))
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const kakaoOnFailure = (error) => {
        console.log('Login failed:', error)
    }

    return (
        <>
            <KakaoLogin
                token={kakaoClientId}
                onSuccess={kakaoOnSuccess}
                onFail={kakaoOnFailure}
            />
        </>
    )
}

export default SocialKakao
