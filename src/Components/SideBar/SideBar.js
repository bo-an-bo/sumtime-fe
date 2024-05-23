import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars
import React, { useState } from 'react' // eslint-disable-line no-unused-vars
import styled from 'styled-components' // eslint-disable-line no-unused-vars
import { NavLink } from 'react-router-dom'
import propTypes from 'prop-types'

const StyledSideBarBox = styled.div`
    display: flex;
    width: 200px;
    height: 600px;
    // background-color: #b9b9b9;
`

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

// const StyledToggleBox = styled.div`
//     display: flex;
//     display: ${(props) => (props.state ? 'none' : 'inline')};
//     background-color: yellow;
// `
const SideBar = ({ memberData, eventData, settingData, transactionData }) => {
    // const [toggleBtn, setToggleBtn] = useState(false)

    return (
        <StyledSideBarBox>
            <p>
                <ul>
                    <StyledLI>
                        <StyledTitle>회원</StyledTitle>
                        {memberData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link">
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                    <StyledLI>
                        <StyledTitle>이벤트</StyledTitle>
                        {eventData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link">
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                    <StyledLI>
                        <StyledTitle>설정</StyledTitle>

                        {settingData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link">
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                    <StyledLI>
                        <StyledTitle>거래내역</StyledTitle>

                        {transactionData.map((data) => (
                            <StyledItem key={data.index}>
                                <StyledNavLink to={data.path} className="nav-link">
                                    &nbsp;{data.name}
                                </StyledNavLink>
                            </StyledItem>
                        ))}
                    </StyledLI>
                </ul>
            </p>
        </StyledSideBarBox>
    )
}

SideBar.propTypes = {
    group_id: propTypes.string,
}

export default SideBar
