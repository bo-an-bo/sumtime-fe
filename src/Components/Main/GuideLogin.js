import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import { Image } from './GuideGroup'

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
                <Divider>로그인</Divider>

                <Image src="img/main/1login.png" alt="Description of Image 1" />
                <Text>카카오톡 로그인을 해요.<br />이때, 선택 항목에 모두 ‘동의’를 체크해주세요.</Text>
            </Section>
        </div>
    )
}

export default Main
