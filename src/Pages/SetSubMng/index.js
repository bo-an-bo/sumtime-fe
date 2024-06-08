import React from 'react'
import SelectManager from '../../Components/Tables/SetManager'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const SetSubMng = () => {
    const groupId = window.location.href.split('/')[4]

    return (
        <StyledMotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <StyledPageLayout>
                <SelectManager groupId={groupId} />
            </StyledPageLayout>
        </StyledMotionDiv>
    )
}

export default SetSubMng

const StyledMotionDiv = styled(motion.div)`
    width: 100%;
    margin: 4%;
    @media (max-width: 768px) {
        margin: 0%;
        margin-top: 50px;
    }
`

const StyledPageLayout = styled.div`
    width: 100%;
`
