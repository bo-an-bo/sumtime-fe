import React from 'react'
import EventTransaction from '../../Components/Tables/EventTransaction'
import SearchOtion from '../../Components/Options/SearchOption'
import styled from 'styled-components'

const ShowEventResult = () => {
    const groupId = window.location.href.split('/')[4]

    return (
        <Wrapper>
            <EventTransaction groupId={groupId} />
            <SearchOtion />
        </Wrapper>
    )
}

export default ShowEventResult

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`
