import React from 'react'
import SelectManager from '../../Components/Tables/SetManager'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const SetSubMng = () => {
    const groupId = window.location.href.split('/')[4]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', margin: '3%' }}
        >
            <StyledPageLayout>
                <SelectManager groupId={groupId} />
            </StyledPageLayout>
        </motion.div>
    )
}

export default SetSubMng

const StyledPageLayout = styled.div`
    width: 100%;
    margin: 2%;
    @media (max-width: 768px) {
        margin-top: 30px;
`
