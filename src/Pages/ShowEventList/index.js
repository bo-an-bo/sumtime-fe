import React from 'react'
import EventCard from '../../Components/Card/EventCard'
import styled from 'styled-components'
// eslint-disable-next-line
import { useMediaQuery } from 'react-responsive'

const ShowEventList = () => {
    const groupId = window.location.href.split('/')[4]
    // 이벤트 id 값을 배열로 만들어서 가져온다.
    // eslint-disable-next-line
    const isopen = useMediaQuery({ maxWidth: 1180 })

    return (
        <StyledPageLayout isopen={isopen}>
            <EventCard groupId={groupId} />
        </StyledPageLayout>
    )
}

const StyledPageLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: ${(props) => (props.isopen ? '150px' : '0')};
`
export default ShowEventList
