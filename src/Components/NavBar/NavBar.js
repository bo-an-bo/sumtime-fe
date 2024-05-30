import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import whiteLogo from '../../IMG/logo_white.svg'
import { useUser } from '../../hooks/useUser'
import Hamburger from '../SideBar/Hamburger'
import LogoutKakao from '../Login/LogoutKakao'
import SignOutServer from '../Login/SignOutServer'

const StyledImg = styled.img`
    width: 100px;
    height: 40px;
    display: flex;
`
const StyledLinkBox = styled(Link)`
    width: 100px;
`

const NavBar = ({ isopen }) => {
    const user = useUser()

    const items = [
        {
            key: 'home',
            label: (
                <StyledLinkBox to="/">
                    <StyledImg src={whiteLogo} alt="white_logo_img" />
                </StyledLinkBox>
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
        <div>
            {' '}
            <StyledMenu isopen={isopen} mode="horizontal" items={items}></StyledMenu>{' '}
            <StyledHamburger isopen={isopen}>
                <Hamburger />
            </StyledHamburger>
        </div>
    )
}

const StyledMenu = styled(Menu)`
    height: 120px;
    width: 100%;
    background-color: #003f98;
    display: ${(props) => (props.isopen ? 'none' : 'display')};
    justify-content: flex-end;
    padding: 40px;

    .ant-menu-item {
        height: 40px;
        color: white;
        font-size: 22px;
        font-weight: 700;
        font-family: 'Dotum Bold', serif;
        word-wrap: break-word;
        margin-right: 50px;
    }
`
const StyledText = styled.div`
    height: 40px;
    color: white;
    font-size: 22px;
    font-weight: 700;
    font-family: 'Dotum Bold', serif;
    word-wrap: break-word;
    margin-right: 50px;`

const StyledHamburger = styled.div`
    display: ${(props) => (props.isopen ? 'display' : 'none')};
`

export default NavBar
