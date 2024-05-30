import React from 'react'
import { Image, Section, StyledDivider, Text, TitleText } from './MainStyle'

const Main = () => {
    return (
        <div>
            <Section>
                <StyledDivider>모임</StyledDivider>

                <TitleText>생성</TitleText>
                <Text>모임 기본 정보를 등록하고, 모임 회원 명단을 업로드해요</Text>
                <Image src="img/main/2group.png" alt="Description of Image 1" />
            </Section>
        </div>
    )
}

export default Main
