import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
// import { useIsDropdownView } from '../../store/StoreNavbar'
import { useState } from 'react'
import { useGroupStore } from '../../store/group'

const Dropdown = () => {
    const [isDropdownView, setIsDropDownView] = useState()
    const { groupId } = useGroupStore()

    const memberData = [
        {
            index: 1,
            name: '회원 명단 업로드',
            path: `${groupId}/uploadMember`,
        },
        {
            index: 2,
            name: '회원 목록',
            path: `${groupId}/showGroupDetails`,
        },
    ]

    const eventData = [
        {
            index: 1,
            name: '이벤트 생성',
            path: `${groupId}/createEvent`,
        },
        {
            index: 2,
            name: '이벤트 목록',
            path: `${groupId}/showEventList`,
        },
    ]

    const settingData = [
        {
            index: 1,
            name: '모임 정보 변경',
            path: `${groupId}/editInfo`,
        },
        {
            index: 2,
            name: '부매니저 설정',
            path: `${groupId}/setSubMng`,
        },
    ]

    const transactionData = [
        {
            index: 1,
            name: '거래내역 업로드',
            path: `${groupId}/uploadTransaction`,
        },
        {
            index: 2,
            name: '이벤트별 조회',
            path: `${groupId}/showEventResult`,
        },
        {
            index: 3,
            name: '거래내역 분석',
            path: `${groupId}/showResult`,
        },
    ]

    const handleClickContainer = () => {
        setIsDropDownView(!isDropdownView)
    }

    const handleBlurContainer = () => {
        setTimeout(() => {
            setIsDropDownView(!isDropdownView)
        }, 200)
    }

    const handleItemClick = () => {
        setIsDropDownView(false) // 메뉴 닫기
    }

    return (
        <StyledHam className="container" onBlur={handleBlurContainer}>
            <StyledMenuButton onClick={handleClickContainer}>메뉴{isDropdownView ? ' ▲' : ' ▼'}</StyledMenuButton>{' '}
            {isDropdownView && (
                <StyledDropdown>
                    <StyledLI>
                        <StyledTitle>회원</StyledTitle>
                        {memberData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link" onClick={handleItemClick}>
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                    <StyledLI>
                        <StyledTitle>이벤트</StyledTitle>
                        {eventData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link" onClick={handleItemClick}>
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                    <StyledLI>
                        <StyledTitle>설정</StyledTitle>

                        {settingData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link" onClick={handleItemClick}>
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                    <StyledLI>
                        <StyledTitle>거래내역</StyledTitle>

                        {transactionData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link" onClick={handleItemClick}>
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                </StyledDropdown>
            )}
        </StyledHam>
    )
}

export default Dropdown

const StyledLI = styled.li`
    list-style-type: none;
    text-decoration: none;
`

const StyledItem = styled.div`
    margin: 10px 10px 0 10px;
    text-decoration: none;
    font-family: 'Dotum Medium';
`

const StyledTitle = styled.div`
    display: flex;
    margin: 30px 0 0 0;
    font-family: 'Dotum Bold';
    font-size: 18px;
`

const StyledNavLink = styled(NavLink)`
    color: black;
    border-left: 2px solid #fff;
    text-decoration: none;
    transition-duration: 0.1s, 0.1s;
    &:hover {
        background-color: rgb(0, 63, 150, 0.1);
        border-left: 4px solid rgb(0, 63, 150);
    }

    &.active {
        background-color: rgb(0, 63, 150, 0.1);
        border-left: 4px solid rgb(0, 63, 150);
        font-family: 'Dotum Bold';
    }
`
const StyledHam = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 30px;
`
const StyledDropdown = styled.div`
    padding: 0 0 20px 20px;
    position: absolute;
    top: 80px;
    left: auto;
    background-color: white;
    box-shadow: 0 15px 16px rgba(0, 0, 0, 0.2);
    z-index: 2;
    width: 200px;
`
const StyledMenuButton = styled(Button)`
    font-family: 'Dotum Medium';
    margin-top: 20px;
`
