import React from 'react'
import styled from 'styled-components'

const StyledNavBar = styled.div`
    height: 200px;
    width: 100%;
    background-color: green;
`

const NavBar = () => {
    return (
        <div>
            <StyledNavBar />
        </div>
    )
}

export default NavBar
