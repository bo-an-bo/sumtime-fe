import React from 'react'

const KakaoLogin = () => {

    const handleLogin = () => {
        window.location.href = process.env.REACT_APP_KAKAO_AUTH_URL
    }

    return (
        <button onClick={handleLogin}>
            카카오 로그인
        </button>
    )
}

export default KakaoLogin
