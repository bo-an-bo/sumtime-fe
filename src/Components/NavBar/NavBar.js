import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import whiteLogo from '../../IMG/logo_white.svg'
import { useMediaQuery } from 'react-responsive'
import Hamburger from '../SideBar/Hamburger'

const StyledImg = styled.img`
    width: 100px;
    height: 40px;
    display: flex;
`
const StyledLinkBox = styled(Link)`
    width: 100px;
`

const NavBar = () => {
    const isOpen = useMediaQuery({ maxWidth: 1180 })
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        const storedNickname = localStorage.getItem('nickname')
        if (storedNickname) {
            setNickname(storedNickname)
        }
    }, [])

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
            label: <Link to="/showProfile">{nickname || '로그인 필요'}</Link>,
        },
    ]

    return <div>{isOpen ? <Hamburger /> : <StyledMenu mode="horizontal" items={items}></StyledMenu>}</div>
}

const StyledMenu = styled(Menu)`
    height: 120px;
    width: 100%;
    background-color: #003f98;
    display: flex;
    justify-content: flex-end;
    padding: 40px;

    .ant-menu-item {
        height: 40px;
        color: white;
        font-size: 22px;
        font-weight: 700;
        font-family: 'Dotum Bold';
        word-wrap: break-word;
        margin-right: 50px;
    }
`

export default NavBar
