import React from 'react'
import EventCard from '../../Components/Card/EventCard'
import styled from 'styled-components'
import { motion } from 'framer-motion'
// eslint-disable-next-line

const ShowEventList = () => {
    const groupId = window.location.href.split('/')[4]
    // 이벤트 id 값을 배열로 만들어서 가져온다.
    // eslint-disable-next-line

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
        >
            <StyledPageLayout>
                <EventCard groupId={groupId} />
            </StyledPageLayout>
        </motion.div>
    )
}

const StyledPageLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    max-height: 70vh; // Set the maximum height you want

    overflow-y: auto; // Enable vertical scrolling
`
export default ShowEventList
