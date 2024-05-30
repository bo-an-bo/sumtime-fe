import React from 'react'
import { Image, Section, StyledDivider, Text } from './MainStyle'

const Main = () => {
    return (
        <div>
            <Section>
                <StyledDivider>미납 회원 알림</StyledDivider>
                <Text>납부하지 않은 이벤트 참여 회원에 대해<br />카카오톡 알림을 보낼 수 있어요</Text>
                <Image src="img/main/11minap.png" alt="Description of Image 1" />
            </Section>
        </div>
    )
}

export default Main
