import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import { loginServer } from '../../apis/auth'

const LoginKakao = () => {
    const { setUser } = useAuth()
    const [isLogin, setIsLogin] = useState(false)
    const Kakao = useMemo(() => window.Kakao || {}, [])

    const initKakao = useCallback(() => {
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY)
        }
    }, [Kakao])

    useEffect(() => {
        initKakao()
    }, [initKakao])

    const serverLogin = async () => {
        const jwt = await loginServer()
        localStorage.setItem('jwt', jwt.data.access_token)
    }

    const kakaoLogin = async () => {
        if (Kakao && Kakao.Auth) {
            await Kakao.Auth.login({
                scope: 'profile_nickname, profile_image, account_email, talk_message, friends',
                success(res) {
                    Kakao.Auth.setAccessToken(res.access_token)
                    console.log('카카오 로그인 성공')

                    Kakao.API.request({
                        url: '/v2/user/me',
                        success(res) {
                            setIsLogin(true)
                            const kakaoAccount = res.kakao_account
                            localStorage.setItem('profileImg', kakaoAccount.profile.profile_image_url)
                            localStorage.setItem('nickname', kakaoAccount.profile.nickname)
                            serverLogin()

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
        if (Kakao && Kakao.Auth) {
            setIsLogin(!!Kakao.Auth.getAccessToken())
        }
    }, [Kakao])

    useEffect(() => {
        if (isLogin) {
            setUser({
                profileImg: localStorage.getItem('profileImg'),
                nickname: localStorage.getItem('nickname'),
            })
        }
    }, [isLogin, setUser])

    return (
        <>
            <KakaoButton onClick={kakaoLogin} />
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