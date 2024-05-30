import React from 'react'
import { Image, Section, StyledDivider, Text } from './MainStyle'

// 메인 페이지 컴포넌트
const Main = () => {
    return (
        <div>
            <Section>

                <StyledDivider>로그인</StyledDivider>

                <Text>카카오톡 로그인을 해요.<br />이때, 선택 항목에 모두 ‘동의’를 체크해주세요.</Text>

                <Image src="img/main/1login.png" alt="Description of Image 1" />

            </Section>
        </div>
    )
}

export default Main
