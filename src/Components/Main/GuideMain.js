import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import Logo from '../../IMG/logo_white.svg'
import exmTab from '../../IMG/exmple_table.svg'
import LoginKakao from '../Login/LoginKakao'
import { Button } from 'antd'
import { MainSection } from './MainStyle'

const Main1 = () => {
    const { user } = useAuth()
    const isopen = useMediaQuery({ maxWidth: 768 })
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate('/group')
    }


    return (
        <div>
            <MainSection>
                <HeaderContainer>
                    <LogoContainer>
                        <StyledLogoImg src={Logo} alt="logo_white_img" isopen={isopen}></StyledLogoImg>
                        <StyledText isopen={isopen}>모임의 계산을 쉽게</StyledText>

                    </LogoContainer>
                    <StyledButtonContainer>

                        {user ? (
                            <>
                                <StyledContent style={{
                                    color: 'white',
                                }}>
                        <span
                            style={{
                                backgroundColor: '#F8FAFF',
                                padding: '0px 7px 0px 7px',
                                borderRadius: '100px',
                                color: '#173E92',
                                fontFamily: 'Dotum Bold',
                                marginRight: '5px',
                            }}
                        >
                            {user.nickname}
                        </span>
                                    님 환영합니다.
                                </StyledContent>
                                <StyledButtonStart onClick={onClickHandler}>sumtime 시작하기</StyledButtonStart>
                            </>
                        ) : (
                            <LoginKakao />
                        )}
                    </StyledButtonContainer>
                </HeaderContainer>
                <StyledContentSection isopen={isopen}>
                    <StyledTableImg src={exmTab} alt="example_tabel" />
                    <StyldMainText>
                        <StyledContent isopen={isopen}>sumtime과 함께 필요한 데이터를 마음껏 다루어 보세요!</StyledContent>
                        <StyledContent style={{ fontSize: '1.2rem' }}>이런 걸 할 수 있어요</StyledContent>
                        <StyledContent>✔️ 모임 회비 안 낸 사람 조회</StyledContent>
                        <StyledContent>✔️ 간식 행사와 같은 모임 내 이벤트 생성</StyledContent>
                        <StyledContent>✔️ 쉽고 빠른 회원 조회, 삭제</StyledContent>
                    </StyldMainText>
                </StyledContentSection>


            </MainSection>
        </div>
    )
}

export default Main1

const StyledText = styled.div`
    color: #fff;
    font-family: 'Dotum Bold', serif;
    font-size: ${(props) => (props.isopen ? '2vh' : '3vh')};
    // margin: 20px;
`

const StyledContent = styled.div`
    font-family: 'Dotum Medium', serif;
    font-size: 1rem;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding-left: 42%;
`
const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-right: 5%;
`
const StyledButtonStart = styled(Button)`
    font-family: 'Dotum Bold', serif;
    //font-size: 20px;
    width: 20vh;
    height: auto;
    align-content: center;
`

const StyledLogoImg = styled.img`
    height: 100px;
    align-self: center; // 중앙 정렬을 위해 추가
    width: ${(props) => (props.isopen ? '10vh' : '15vh')};
`

const StyledTableImg = styled.img`
    //width: 430px;
    //height: 300px;
    //margin: 20px auto; // 센터 정렬을 위해 수정

    @media (max-width: 768px) {
        width: 400px; // 모바일에서 테이블 이미지 크기 조정
        height: 210px;
    }
`

const StyledContentSection = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;

    display: flex;
    flex-direction: ${(props) => (props.isopen ? 'column' : 'row')};

    gap: 20px;
    width: 100%;
    height: ${(props) => (props.isopen ? '55vh' : '30vh')};
    background-color: #fff;
    font-family: 'Dotum Bold', serif;
    font-size: 20px;
    justify-content: center; // 콘텐츠를 중앙으로 정렬
    align-items: center; // 수직 중앙 정렬 추가
`

const StyldMainText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    background-color: #173E92;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;

`
