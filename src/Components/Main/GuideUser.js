import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import { TitleText } from './GuideGroup'

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
export const VerticalSection = styled.div`
    display: flex;
    flex-direction: row;

`

export const DescriptionSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1
`

// const Image = styled.img`
//     max-width: 80%;
//     height: auto;
//     margin-bottom: 20px;
// `
export const VerticalImage = styled.img`
    height: 33vh;
    margin-bottom: 20px;
    gap: 10px;
`
const Text = styled.p`
    font-size: 20px;
    color: #333;
`

// 메인 페이지 컴포넌트
const Main = () => {
    return (
        <div>
            <Section>
                <Divider>회원</Divider>
                <VerticalSection>
                    <DescriptionSection>
                        <VerticalImage src="img/main/3upload.png" alt="Description of Image 1" />
                        <TitleText>1. 업로드</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                    </DescriptionSection>
                    <Divider type="vertical" />
                    <DescriptionSection>
                        <VerticalImage src="img/main/4get.png" alt="Description of Image 1" />
                        <TitleText>2.조회</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                    </DescriptionSection>
                </VerticalSection>
            </Section>
        </div>
    )
}

export default Main
