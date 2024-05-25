import React from 'react'
import EventTransaction from '../../Components/Tables/EventTransaction'
import styled from 'styled-components'

const ShowEventResult = () => {
    const groupId = window.location.href.split('/')[4]

    return (
        <Wrapper>
            <EventTransaction groupId={groupId} />
        </Wrapper>
    )
}

export default ShowEventResult

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`
