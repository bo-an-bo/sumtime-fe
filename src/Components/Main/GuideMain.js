import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import Logo from '../../IMG/logo_white.svg'
import exmTab from '../../IMG/exmple_table.svg'
import LogoutKakao from '../Login/LogoutKakao'
import LoginKakao from '../Login/LoginKakao'
import { Button } from 'antd'
// 각 섹션을 스타일링
const Section = styled.div`
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    //padding: 20px;
    box-sizing: border-box;
`

// const Image = styled.img`
//     max-width: 80%;
//     height: auto;
//     margin-bottom: 20px;
// `
//
// const Text = styled.p`
//     font-size: 20px;
//     color: #333;
// `

// 메인 페이지 컴포넌트
const Main1 = () => {
    const { user } = useAuth()
    const isopen = useMediaQuery({ maxWidth: 768 })
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate('/group')
    }

    const onClickIntroHandler = () => {
        navigate('/guide')
    }

    return (
        <div>
            <Section>
                <HeaderContainer>
                    <LogoContainer>
                        <StyledLogoImg src={Logo} alt="logo_white_img" isopen={isopen}></StyledLogoImg>
                        <StyledText isopen={isopen}>모임의 계산을 쉽게</StyledText>

                    </LogoContainer>
                    <StyledButtonContainer>
                        {user && (
                            <StyledContent>
                        <span
                            style={{
                                backgroundColor: '#b9d5ff',
                                padding: '0px 5px 0px 5px',
                                margin: '0px 5px 0px 0px',
                                borderRadius: '10px',
                            }}
                        >
                            {user.nickname}
                        </span>
                                님 환영합니다.
                            </StyledContent>
                        )}
                        {user ? (
                            <StyledButtonStart onClick={onClickHandler}>sumtime 시작하기</StyledButtonStart>
                        ) : (
                            <StyledButtonStart onClick={onClickIntroHandler}>sumtime 소개</StyledButtonStart>
                        )}

                        {user ? (
                            <>
                                <LogoutKakao />
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


            </Section>
        </div>
    )
}

export default Main1

const StyledText = styled.div`
    color: #fff;
    font-family: 'Dotum Bold', serif;
    font-size: ${(props) => (props.isopen ? '2vh' : '4vh')};
    // margin: 20px;
`

const StyledContent = styled.div`
    color: #003f98;
    font-family: 'Dotum Medium', serif;
    font-size: 1rem;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    top: 0;
`
const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 20px;
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
    width: ${(props) => (props.isopen ? '10vh' : '20vh')};
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

`
