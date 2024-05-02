import React from 'react'
import GroupCard from '../../Components/Card/GroupCard'
import styled from 'styled-components'

const StyledGroupListLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const ShowGroupList = () => {
    return (
        <StyledGroupListLayout>
            <GroupCard />
        </StyledGroupListLayout>
    )
}

export default ShowGroupList
