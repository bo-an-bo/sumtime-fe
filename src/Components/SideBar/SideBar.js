import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars
import React, { useState } from 'react' // eslint-disable-line no-unused-vars
import styled from 'styled-components' // eslint-disable-line no-unused-vars
import { NavLink } from 'react-router-dom'

const StyledSideBarBox = styled.div`
    width: 20%;
    height: 300px;
`
// const StyledSubTitle = styled.div`
//     padding: 6px 15px;
//     cursor: pointer;
//     border-left: 2px solid #fff;

//     &:hover {
//         background-color: rgb(0, 63, 150, 0.1);
//         //border-radius: 5px;
//         border-left: 2px solid rgb(0, 63, 150);
//     }
// `

// const StyledActive = styled.div`
//     background-color: rgb(0, 63, 150, 0.1);
//     //border-radius: 5px;
//     border-left: 2px solid rgb(0, 63, 150);
// `

const StyledLI = styled.li`
    list-style-type: none;
    text-decoration: none;
`

const StyledItem = styled.div`
    margin: 10px;
    text-decoration: none;
`

const SideBar = () => {
    const contents = [
        {
            index: 1,
            name: '회원명단업로드',
            path: '/member',
        },
        {
            index: 2,
            name: '회원 목록',
            path: '/group/{groupId}/member',
        },
        {
            index: 3,
            name: '이벤트 생성',
            path: '/event',
        },
        {
            index: 4,
            name: '이벤트 목록',
            path: '/group/{groupId}/event',
        },
        {
            index: 5,
            name: '모임 정보 변경',
            path: '/eventedit',
        },
        {
            index: 6,
            name: '부매니저 설정',
            path: '/sub',
        },
        {
            index: 7,
            name: '거래내역 업로드',
            path: '/uploadfile',
        },
        {
            index: 8,
            name: '이벤트별 조회',
            path: '/eventcount',
        },
        {
            index: 9,
            name: '거래내역분석',
            path: '/result',
        },
    ]

    return (
        <StyledSideBarBox>
            <ul>
                <StyledLI>
                    {contents.map((data) => (
                        <StyledItem key={data.index}>
                            <NavLink
                                to={data.path}
                                style={({ isActive }) => {
                                    return isActive
                                        ? {
                                              backgroundColor: 'rgb(0, 63, 150, 0.1)',
                                              borderleft: '2px solid rgb(0, 63, 150)',
                                          }
                                        : { color: 'black', textdecoration: 'none' }
                                }}
                            >
                                {data.name}
                            </NavLink>
                        </StyledItem>
                    ))}
                </StyledLI>
            </ul>
            {contents.map((data) => (
                <NavLink
                    style={{ color: 'black', textDecoration: 'none' }}
                    to={data.path}
                    key={data.index}
                    // activeStyle={{ fontWeight: 'bold' }}
                    //style={StyledActive}
                >
                    {/* <StyledSubTitle>{data.name}</StyledSubTitle> */}
                </NavLink>
            ))}
        </StyledSideBarBox>
    )
}

export default SideBar
