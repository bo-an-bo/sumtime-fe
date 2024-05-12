import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import whiteLogo from '../../IMG/logo_white.svg'

const StyledImg = styled.img`
    width: 100px;
    height: 40px;
    display: flex;
`
const StyledLinkBox = styled(Link)`
    width: 100px;
`

const NavBar = () => {
    return <StyledMenu mode="horizontal" items={items}></StyledMenu>
}

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
        label: <Link to="/showProfile">김보안</Link>,
    },
]
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
