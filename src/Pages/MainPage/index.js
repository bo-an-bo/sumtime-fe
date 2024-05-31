import React from 'react' // eslint-disable-line no-unused-vars
import styled from 'styled-components'
import GuideGroup from '../../Components/Main/GuideGroup'
import GuideMain from '../../Components/Main/GuideMain'
import GuideLogin from '../../Components/Main/GuideLogin'
import GuideUser from '../../Components/Main/GuideUser'
import GuideEvent from '../../Components/Main/GuideEvent'
import GuideTransaction from '../../Components/Main/GuideTransaction'
import GuideMinap from '../../Components/Main/GuideMinap' // eslint-disable-line no-unused-vars
import { motion } from 'framer-motion'
const MainPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
        >
            <StyledLayoutMain>
                <GuideMain />
                <GuideLogin />
                <GuideGroup />
                <GuideUser />
                <GuideEvent />
                <GuideTransaction />
                <GuideMinap />
            </StyledLayoutMain>
        </motion.div>
    )
}

const StyledLayoutMain = styled.div`
    height: 100vh;
    background-color: #e9f4fe;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
`

export default MainPage
