import React from 'react'
import UploadTransaction from '../../Components/Upload/UploadTranaction'
import { motion } from 'framer-motion'

const UploadTransactions = () => {
    const groupId = window.location.href.split('/')[4]
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', margin: '2%' }}
        >
            <UploadTransaction groupId={groupId} />
        </motion.div>
    )
}

export default UploadTransactions
