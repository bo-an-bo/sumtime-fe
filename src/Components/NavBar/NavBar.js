import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const NavBar = () => {
    return <StyledMenu mode="horizontal" items={items}></StyledMenu>
}

const items = [
    {
        key: 'home',
        label: <Link to="/">썸타임 로고 자리</Link>,
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
    height: 200px;
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
        font-family: 'KoPubWorld Dotum';
        word-wrap: break-word;
        margin-right: 50px;
    }
`

export default NavBar
