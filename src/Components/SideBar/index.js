import React from 'react'
import SideBar from './SideBar'
// import Hamburger from './Hamburger'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components'

const SideBarIndex = () => {
    const isOpen = useMediaQuery({ maxWidth: 1180 })
    const memberData = [
        {
            index: 1,
            name: '회원 명단 업로드',
            path: `uploadMember`,
        },
        {
            index: 2,
            name: '회원 목록',
            path: `showGroupDetails`,
        },
    ]

    const eventData = [
        {
            index: 1,
            name: '이벤트 생성',
            path: `createEvent`,
        },
        {
            index: 2,
            name: '이벤트 목록',
            path: `showEventList`,
        },
    ]

    const settingData = [
        {
            index: 1,
            name: '모임 정보 변경',
            path: `editInfo`,
        },
        {
            index: 2,
            name: '부매니저 설정',
            path: `setSubMng`,
        },
    ]

    const transactionData = [
        {
            index: 1,
            name: '거래내역 업로드',
            path: `uploadTransaction`,
        },
        {
            index: 2,
            name: '이벤트별 조회',
            path: `showEventResult`,
        },
        {
            index: 3,
            name: '거래내역 분석',
            path: `showResult`,
        },
    ]

    // const onToggleClick = () => {
    //     setToggleBtn(true)
    // }

    if (window.location.pathname === '/group' || window.location.pathname === '/') return null

    return (
        <StyledSideBar>
            {' '}
            {isOpen ? (
                <div></div>
            ) : (
                <SideBar
                    memberData={memberData}
                    eventData={eventData}
                    settingData={settingData}
                    transactionData={transactionData}
                />
            )}
        </StyledSideBar>
    )
}

const StyledSideBar = styled.div`
    display: flex;
    flex-direction: column;
`
export default SideBarIndex
