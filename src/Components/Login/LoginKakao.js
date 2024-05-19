import React from 'react'

const LoginKakao = () => {
    const kakaoURL = process.env.REACT_APP_KAKAO_AUTH_URL

    const loginHandler = () => {
        window.location.href = kakaoURL
    }

    return (
        <button type="button" onClick={loginHandler}>
            로그인 하기
        </button>
    )
}
export default LoginKakao
