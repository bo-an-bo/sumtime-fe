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
                <StyledDivider>거래내역</StyledDivider>
                <VerticalSection>
                    <DescriptionSection>
                        <TitleText><StyleNum>1</StyleNum>업로드</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                        <VerticalImage src="img/main/8tra-upload.png" alt="Description of Image 1" />

                    </DescriptionSection>
                    <Divider type="vertical" style={{ height: '100%' }} />
                    <DescriptionSection>
                        <TitleText><StyleNum>2</StyleNum>조회</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                        <VerticalImage src="img/main/9tra-get.png" alt="Description of Image 1" />
                        <VerticalImage src="img/main/10tra-get.png" alt="Description of Image 1" />

                    </DescriptionSection>
                </VerticalSection>
            </Section>
        </div>
    )
}

export default Main
