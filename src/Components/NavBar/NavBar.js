import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import whiteLogo from '../../IMG/logo_white.svg'
import { useUser } from '../../hooks/useUser'
import LogoutKakao from '../Login/LogoutKakao'
import SignOutServer from '../Login/SignOutServer'
import Dropdown from '../SideBar/Dropdown'
import { useMediaQuery } from 'react-responsive'

const NavBar = () => {
    const user = useUser()
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const location = useLocation()

    const pathMatchId = location.pathname.match(/^\/group\/[a-f\d]{24}$/)

    const items = [
        {
            key: 'home',
            label: (
                <Link to="/">
                    <StyledImg src={whiteLogo} alt="white_logo_img" />
                </Link>
            ),
        },
        {
            key: 'myGroups',
            label: <Link to="/group">나의 모임</Link>,
        },
        {
            key: 'myProfile',
            label: <StyledText>{user ? user.nickname : '로그인 필요'}</StyledText>,
            children: [
                { label: <LogoutKakao />, key: 'setting:1' },
                { label: <SignOutServer />, key: 'setting:2' },
            ],
        },
    ]

    return (
        <Wrapper>
            {isMobile && pathMatchId && <Dropdown />}
            <StyledMenu mode="horizontal" items={items}></StyledMenu>
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
    height: 90px;
    background-color: #003f98;
    justify-content: flex-end;
    margin-top: 40px;
    margin-right: 50px;
    gap: 40px;
    @media (max-width: 768px) {
        gap: 0px;
        margin-right: 0px;
    }

    .ant-menu-item {
        color: white;
        font-size: 22px;
        font-weight: 700;
        font-family: 'Dotum Bold', serif;
        word-wrap: break-word;

        @media (max-width: 768px) {
            font-size: 18px;
        }
    }
`
const StyledText = styled.div`
    height: 40px;
    color: white;
    font-size: 22px;
    font-weight: 700;
    font-family: 'Dotum Bold', serif;
    word-wrap: break-word;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`
const StyledImg = styled.img`
    width: 100px;
    height: 40px;
    display: flex;
`

export default NavBar
