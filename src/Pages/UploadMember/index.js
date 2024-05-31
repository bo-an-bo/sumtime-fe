import React from 'react'
import UploadMember from '../../Components/Upload/UploadMember'
import { motion } from 'framer-motion'

const UploadMembers = () => {
    const groupId = window.location.href.split('/')[4]
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', margin: '2%' }}
        >
            <UploadMember groupId={groupId} />
        </motion.div>
    )
}

export default UploadMembers
