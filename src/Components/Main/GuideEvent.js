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
                        <Text>기본 정보를 입력하고, 모임에 참여하는 회원을 선택해주세요</Text>
                        <VerticalImage src="img/main/5event-create.png" alt="Description of Image 1" />

                        <VerticalImage src="img/main/6event-create.png" alt="Description of Image 1" />

                    </DescriptionSection>
                    <Divider type="vertical" style={{ height: '100%' }} />
                    <DescriptionSection>
                        <TitleText><StyleNum>2</StyleNum>조회</TitleText>
                        <Text>생성한 이벤트를 조회할 수 있어요</Text>
                        <VerticalImage src="img/main/7event-get.png" alt="Description of Image 1" />

                    </DescriptionSection>
                </VerticalSection>
            </Section>
        </div>
    )
}

export default Main
