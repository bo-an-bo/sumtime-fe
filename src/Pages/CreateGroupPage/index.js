import React from 'react'
import CreateForm from '../../Components/Forms/CreateForm'
//import CreateForm from '../../Components/Forms/CreateForm'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const StyledBack = styled.div`
    width: 100%;
`
const CreateGroup = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ width: '100%' }}
        >
            <StyledBack>
                <CreateForm />
            </StyledBack>
        </motion.div>
    )
}

export default CreateGroup
