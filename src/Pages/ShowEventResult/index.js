import React from 'react'
import EventTransaction from '../../Components/Tables/EventTransaction'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ShowEventResult = () => {
    const groupId = window.location.href.split('/')[4]
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ width: '100%', margin: '2%' }}
        >
            <Wrapper>
                <EventTransaction groupId={groupId} />
            </Wrapper>
        </motion.div>
    )
}

export default ShowEventResult

const Wrapper = styled.div`
    //가운데로
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10%;
    @media (max-width: 768px) {
        margin-left: 0;
    `
