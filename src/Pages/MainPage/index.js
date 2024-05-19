import React from 'react' // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom' // eslint-disable-line no-unused-vars
import styled from 'styled-components' // eslint-disable-line no-unused-vars
import LogoColor from '../../IMG/logo_color.svg'
import exmTab from '../../IMG/exmple_table.svg'

import { Button } from 'antd'
import LoginKakao from '../../Components/Login/KakaoLogin'

const MainPage = () => {
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate('/group')
    }

    const StyledLayoutMain = styled.div`
        display: flex;
        flex-direction: column;
    `
    const StyledButtonStart = styled(Button)`
        font-family: 'Dotum Bold';
        font-size: 28px;
        width: 300px;
        height: 60px;
        margin: 3% 43%;
    `

    const StyledLogoImg = styled.img`
        width: 200px;
        height: 115px;
        padding: 4% 45%;
    `

    const StyledTableImg = styled.img`
        width: 430px;
        height: 300px;
        margin: -20px 15%;
    `

    const StyledContentSection = styled.div`
        display: flex;
        margin: flex-direction: row;
        width: 100%;
        height: 250px;
        background-color: #dceaff;
        font-family: 'Dotum Bold', serif;
        font-size: 20px;
    `

    const StyldMainText = styled.div`
        margin: 40px 0 0 -250px;
    `
    return (
        <StyledLayoutMain>
            <StyledLogoImg src={LogoColor} alt="logo_white_img"></StyledLogoImg>

            <StyledContentSection>
                <StyledTableImg src={exmTab} alt="example_tabel" />
                <StyldMainText>sumtime과 함께 필요한 데이터를 마음껏 다루어 보세요!</StyldMainText>
            </StyledContentSection>
            <StyledButtonStart onClick={onClickHandler}>sumtime 시작하기</StyledButtonStart>
            <LoginKakao />
        </StyledLayoutMain>
    )
}

export default MainPage
