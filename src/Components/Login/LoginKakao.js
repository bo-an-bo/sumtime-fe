import React from 'react'
// import { kakao_login_large_narrow } from '../../IMG/kakao_login_large_narrow.png'
// import styled from 'styled-components'
// const MY_REST_API_KEY = process.env.REACT_APP_REST_API_KEY
// const MY_REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const kakaoURL = process.env.REACT_APP_KAKAO_AUTH_URL

// const StyledButton = styled.button`
//     background-img: ${(props) => {
//         props.img
//     }};
// `

const LoginKakao = () => {
    const handleLogin = () => {
        window.location.href = kakaoURL
    }
    return (
        <div>
            <button onClick={handleLogin}>
                카카오로그인
            </button>
        </div>
    )
}

export default LoginKakao
