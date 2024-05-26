import React from 'react'
import EventTransaction from '../../Components/Tables/EventTransaction'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

const ShowEventResult = () => {
    const groupId = window.location.href.split('/')[4]
    const isopen = useMediaQuery({ maxWidth: 1180 })
    return (
        <Wrapper isopen={isopen}>
            <EventTransaction groupId={groupId} />
        </Wrapper>
    )
}

export default ShowEventResult

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: ${(props) => (props.isopen ? '150px' : '0')};
    margin-left: 50px;
`
