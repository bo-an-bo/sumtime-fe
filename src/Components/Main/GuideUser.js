import React from 'react'
import { Divider } from 'antd'
import {
    DescriptionSection,
    Section,
    StyledDivider,
    StyleNum,
    Text,
    TitleText,
    VerticalImage,
    VerticalSection,
} from './MainStyle'


// 메인 페이지 컴포넌트
const Main = () => {
    return (
        <div>
            <Section>
                <StyledDivider>회원</StyledDivider>
                <VerticalSection>
                    <DescriptionSection>
                        <VerticalImage src="img/main/3upload.png" alt="Description of Image 1" />
                        <TitleText><StyleNum>1</StyleNum>업로드</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                    </DescriptionSection>
                    <Divider type="vertical" style={{ height: '100%' }} />
                    <DescriptionSection>
                        <VerticalImage src="img/main/4get.png" alt="Description of Image 1" />
                        <TitleText><StyleNum>2</StyleNum>조회</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                    </DescriptionSection>
                </VerticalSection>
            </Section>
        </div>
    )
}

export default Main
