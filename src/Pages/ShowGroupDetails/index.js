import React from 'react'
import styled from 'styled-components'
import Tables from '../../Components/Tables/Tables'

const Wrapper = styled.div`
    padding: 10px;
    border-radius: 20px;
    background-color: rgba(0, 62.67, 151.94, 0.04);
    max-width: 680px;
    margin: 10px 60px;
`

const ShowGroupDetails = () => {
    const groupId = window.location.href.split('/')[4]

    return (
        <div>
            <Wrapper>
                <Tables groupId={groupId} />
            </Wrapper>
        </div>
    )
}

export default ShowGroupDetails
