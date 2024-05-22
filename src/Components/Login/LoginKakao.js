import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const LoginKakao = ({ onLogin }) => {
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const Kakao = window.Kakao || {}
    if (onLogin) onLogin()
    // Ensure Kakao is initialized
    const initKakao = useCallback(() => {
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY)
            console.log(Kakao.isInitialized())
        }
    }, [])

    const kakaoLogin = async () => {
        if (Kakao && Kakao.Auth) {
            await Kakao.Auth.login({
                success(res) {
                    console.log(res)
                    Kakao.Auth.setAccessToken(res.access_token)
                    console.log('카카오 로그인 성공')

                    Kakao.API.request({
                        url: '/v2/user/me',
                        success(res) {
                            console.log('카카오 인가 요청 성공', res)
                            setIsLogin(true)
                            const kakaoAccount = res.kakao_account
                            localStorage.setItem('email', kakaoAccount.email)
                            localStorage.setItem('profileImg', kakaoAccount.profile.profile_image_url)
                            localStorage.setItem('nickname', kakaoAccount.profile.nickname)
                        },
                        fail(error) {
                            console.log(error)
                        },
                    })
                },
                fail(error) {
                    console.log(error)
                },
            })
        }
    }

    useEffect(() => {
        initKakao()
    }, [])

    useEffect(() => {
        if (Kakao && Kakao.Auth) {
            setIsLogin(!!Kakao.Auth.getAccessToken())
        }
    }, [])

    useEffect(() => {
        if (isLogin) {
            setUser({
                email: localStorage.getItem('email'),
                profileImg: localStorage.getItem('profileImg'),
                nickname: localStorage.getItem('nickname'),
            })
        }
    }, [isLogin])

    return (
        <>
            <KakaoButton onClick={kakaoLogin} />
            {user && (
                <div>
                    <h2>카카오 로그인 성공!</h2>
                    <h3>카카오 프로필 사진</h3>
                    <img src={user.profileImg} alt="" />
                    <h3>카카오 닉네임</h3>
                    <h4>{user.nickname}</h4>
                    <h3>카카오 이메일</h3>
                    <h4>{user.email}</h4>
                </div>
            )}
        </>
    )
}

const KakaoButton = styled.button`
    background-image: url("/img/kakao_login_medium.png");
    width: 90px;
    height: 45px;
    border: transparent;

    &:hover {
        opacity: 0.9;
    }
`

export default LoginKakao
