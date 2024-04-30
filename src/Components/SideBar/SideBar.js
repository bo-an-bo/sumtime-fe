import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars
import React, { useState } from 'react' // eslint-disable-line no-unused-vars
import styled from 'styled-components' // eslint-disable-line no-unused-vars
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { getMember } from '../../apis/members'

const StyledSideBarBox = styled.div`
    width: 30%;
    height: 500px;
    // background-color: #b9b9b9;
`

const StyledLI = styled.li`
    list-style-type: none;
    text-decoration: none;
`

const StyledItem = styled.div`
    margin: 10px 10px 0 10px;
    text-decoration: none;
`

const StyledTitle = styled.div`
    display: flex;
    margin: 30px 0 0 0;
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
    }
`
const SideBar = ({ group_id }) => {
    const memberData = [
        {
            index: 1,
            name: '회원명단업로드',
            path: `group/${group_id}/uploadMember`,
        },
        {
            index: 2,
            name: '회원 목록',
            path: `group/${group_id}/showGroupDetails`,
        },
    ]

    const eventData = [
        {
            index: 1,
            name: '이벤트 생성',
            path: `/group/${group_id}/createEvent`,
        },
        {
            index: 2,
            name: '이벤트 목록',
            path: `/group/${group_id}/showEvent`,
        },
    ]

    const settingData = [
        {
            index: 1,
            name: '모임 정보 변경',
            path: `/group/${group_id}/editInfo`,
        },
        {
            index: 2,
            name: '부매니저 설정',
            path: `group/${group_id}/setSubMng`,
        },
    ]

    const transactionData = [
        {
            index: 1,
            name: '거래내역 업로드',
            path: `group/${group_id}/uploadResult`,
        },
        {
            index: 2,
            name: '이벤트별 조회',
            path: `group/${group_id}/showResult`,
        },
        {
            index: 3,
            name: '거래내역분석',
            path: `group/${group_id}/showResult`,
        },
    ]

    const [members, setMembers] = useState([])
    const groupId = window.location.href.split('/')[4]
    useEffect(() => {
        getMember(groupId).then((data) => {
            setMembers(data)
        })
    }, [])
    console.log(members)

    if (window.location.pathname === '/group' || window.location.pathname === '/') return null
    return (
        <StyledSideBarBox>
            <ul>
                <StyledLI>
                    <StyledTitle>회원</StyledTitle>
                    {memberData.map((data) => (
                        <StyledItem key={data.index}>
                            <StyledNavLink to={data.path} activeClassName="active" className="nav-link">
                                &nbsp;{data.name}
                            </StyledNavLink>
                        </StyledItem>
                    ))}
                </StyledLI>
                <StyledLI>
                    <StyledTitle>이벤트</StyledTitle>
                    {eventData.map((data) => (
                        <StyledItem key={data.index}>
                            <StyledNavLink to={data.path} activeClassName="active" className="nav-link">
                                &nbsp;{data.name}
                            </StyledNavLink>
                        </StyledItem>
                    ))}
                </StyledLI>
                <StyledLI>
                    <StyledTitle>설정</StyledTitle>

                    {settingData.map((data) => (
                        <StyledItem key={data.index}>
                            <StyledNavLink to={data.path} activeClassName="active" className="nav-link">
                                &nbsp;{data.name}
                            </StyledNavLink>
                        </StyledItem>
                    ))}
                </StyledLI>
                <StyledLI>
                    <StyledTitle>거래내역</StyledTitle>

                    {transactionData.map((data) => (
                        <StyledItem key={data.index}>
                            <StyledNavLink to={data.path} activeClassName="active" className="nav-link">
                                &nbsp;{data.name}
                            </StyledNavLink>
                        </StyledItem>
                    ))}
                </StyledLI>
            </ul>
        </StyledSideBarBox>
    )
}

export default SideBar
