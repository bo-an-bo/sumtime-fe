import { Button, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import whiteLogo from '../../IMG/logo_white.svg'
import { useUser } from '../../hooks/useUser'
import LogoutKakao from '../Login/LogoutKakao'
import SignOutServer from '../Login/SignOutServer'
import Dropdown from '../SideBar/Dropdown'
import { useDeviceType } from '../../hooks/useMediaQuery'

const NavBar = () => {
    const user = useUser()
    const location = useLocation()
    const { isMobile } = useDeviceType()

    const pathMatchId = location.pathname.match(/^\/group\/[a-f\d]{24}(\/.*)?$/)

    let items = [
        {
            key: 'home',
            label: (
                <StyledLink to="/">
                    <StyledImg src={whiteLogo} alt="white_logo_img" />
                </StyledLink>
            ),
        },
        {
            key: 'myGroups',
            label: <StyledLink to="/group">나의 모임</StyledLink>,
        },
        {
            key: 'myProfile',
            label: <StyledText>{user ? user.nickname : '로그인 필요'}</StyledText>,
            children: [
                {
                    label: (
                        <Button
                            type="link"
                            style={{ padding: '0', height: 'auto', lineHeight: 'inherit', fontFamily: 'Dotum Bold' }}
                        >
                            <Link to="/group/mypage">내 정보</Link>
                        </Button>
                    ),
                    key: 'profile:1',
                },
                { label: <LogoutKakao />, key: 'setting:1' },
                { label: <SignOutServer />, key: 'setting:2' },
            ],
        },
    ]

    return (
        <Wrapper>
            {isMobile && pathMatchId && <Dropdown />}
            <StyledMenu mode="horizontal" items={items} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: #003f98;
`

const StyledMenu = styled(Menu)`
    width: 100%;
    height: 80px;
    background-color: #003f98 !important;
    justify-content: flex-end;
    margin-top: 40px;
    padding: 0 70px;
    gap: 70px;
    display: flex;

    .ant-menu-item {
        padding: 0;
        color: white;
        font-family: 'Dotum Bold', serif;
    }

    @media (max-width: 768px) {
        gap: 3px;
        padding: 0 5px;
    }
`

const StyledLink = styled(Link)`
    font-size: 22px;
    font-weight: 700;
    align-items: center;
    word-wrap: break-word;
    line-height: inherit;
    font-family: 'Dotum Bold', serif;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const StyledText = styled.div`
    color: white;
    font-size: 22px;
    font-weight: 700;
    font-family: 'Dotum Bold', serif;
    word-wrap: break-word;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const StyledImg = styled.img`
    width: 100px;
    height: 40px;
    display: flex;

    @media (max-width: 768px) {
        width: 80px;
        height: 35px;
        margin-top: 5px;
    }
`

export default NavBar
