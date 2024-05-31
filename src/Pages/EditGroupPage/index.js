import React from 'react'
import EditGroupInfo from '../../Components/Forms/EditGroupInfo'
import { motion } from 'framer-motion'
const EditGroupPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            style={{ width: '100%' }}
        >
            <EditGroupInfo />
        </motion.div>
    )
}

export default EditGroupPage
