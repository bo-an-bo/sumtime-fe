import React from 'react'
import EventTransaction from '../../Components/Tables/EventTransaction'
import SearchOtion from '../../Components/Options/SearchOption'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

const ShowEventResult = () => {
    const groupId = window.location.href.split('/')[4]
    const isOpen = useMediaQuery({ maxWidth: 1180 })
    return (
        <Wrapper isOpen={isOpen}>
            <EventTransaction groupId={groupId} />
            <SearchOtion />
        </Wrapper>
    )
}

export default ShowEventResult

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: ${(props) => (props.isOpen ? '150px' : '')};
    margin-left: 30px;
`
