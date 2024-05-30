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


const Main = () => {
    return (
        <div>
            <Section>
                <StyledDivider>이벤트</StyledDivider>
                <VerticalSection>
                    <DescriptionSection>
                        <TitleText><StyleNum>1</StyleNum>생성</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                        <VerticalImage src="img/main/5event-create.png" alt="Description of Image 1" />

                        <VerticalImage src="img/main/6event-create.png" alt="Description of Image 1" />

                    </DescriptionSection>
                    <Divider type="vertical" style={{ height: '100%' }} />
                    <DescriptionSection>
                        <TitleText><StyleNum>2</StyleNum>조회</TitleText>
                        <Text>엑셀 형식의 회원 명단을 업로드해요</Text>
                        <VerticalImage src="img/main/7event-get.png" alt="Description of Image 1" />

                    </DescriptionSection>
                </VerticalSection>
            </Section>
        </div>
    )
}

export default Main
