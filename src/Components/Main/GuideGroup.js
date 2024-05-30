import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'

// 각 섹션을 스타일링
const Section = styled.div`
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
`

export const Image = styled.img`
    height: 60vh;
    margin-bottom: 20px;
`

const Text = styled.p`
    font-size: 20px;
    color: #333;
`
export const TitleText = styled.p`
    font-size: 20px;
    color: #333;
`

// 메인 페이지 컴포넌트
const Main = () => {
    return (
        <div>
            <Section>
                <Divider>모임</Divider>

                <Image src="img/main/2group.png" alt="Description of Image 1" />
                <TitleText>생성</TitleText>
                <Text>모임 기본 정보를 등록하고, 모임 회원 명단을 업로드해요</Text>
            </Section>
        </div>
    )
}

export default Main
