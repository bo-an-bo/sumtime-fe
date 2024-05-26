import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import whiteLogo from '../../IMG/logo_white.svg'
import { useMediaQuery } from 'react-responsive'
import Dropdown from './Dropdown'
// 아예 새롭게 nav bar 구성
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

const StyledImg = styled.img`
    width: 100px;
    height: 40px;
    display: flex;
`
const StyledLinkBox = styled(Link)`
    width: 100px;
`

const StyledMobiLeNavbar = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 120px;
    background-color: #003f98;
`

const Hamburger = () => {
    const isopen = useMediaQuery({ maxWidth: 1180 })
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
            key: 'myProfile',
            label: <Link to="/showProfile">{nickname || '로그인 필요'}</Link>,
        },
    ]
    // if (location.pathname === '/group' || location.pathname === '/') return null
    return (
        <div>
            {isopen ? (
                <StyledMobiLeNavbar>
                    <Dropdown />
                    <StyledMenu mode="horizontal" items={items}></StyledMenu>
                </StyledMobiLeNavbar>
            ) : (
                <StyledMenu mode="horizontal" items={items}></StyledMenu>
            )}
        </div>

        // const StyledSideBarBox = styled.div`
        //     display: flex;
        //     width: 200px;
        //     height: 500px;
        //     background-color: #b9b9b9;
        // `
    )
}
export default Hamburger
