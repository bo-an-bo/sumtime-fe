import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import { TitleText } from './GuideGroup'
import { DescriptionSection, VerticalImage, VerticalSection } from './GuideUser'

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


const Text = styled.p`
    font-size: 20px;
    color: #333;
`

// 메인 페이지 컴포넌트
const Main = () => {
    return (
        <div>
            <Section>
                <Divider>이벤트</Divider>
                <VerticalSection>
                    <DescriptionSection>
                        <TitleText>1. 생성</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                        <VerticalImage src="img/main/5event-create.png" alt="Description of Image 1" />

                        <VerticalImage src="img/main/5event-create.png" alt="Description of Image 1" />
                        
                    </DescriptionSection>
                    <Divider type="vertical" />
                    <DescriptionSection>
                        <TitleText>2.조회</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                        <VerticalImage src="img/main/4get.png" alt="Description of Image 1" />

                    </DescriptionSection>
                </VerticalSection>
            </Section>
        </div>
    )
}

export default Main
