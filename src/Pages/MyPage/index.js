import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import UserCard from '../../Components/Card/UserCard'
import MyGroups from '../../Components/Tables/MyGroups'
import base64 from 'base-64'
import { motion } from 'framer-motion'

const MyPage = () => {
    const [userId, setUserId] = useState('')

    useEffect(() => {
        let jwt = localStorage.getItem('jwt')
        if (jwt) {
            let payload = jwt.substring(jwt.indexOf('.') + 1, jwt.lastIndexOf('.'))
            let decoded = base64.decode(payload)
            let userId = JSON.parse(decoded).sub
            setUserId(userId)
        }
    }, [])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: '100%' }}>
            <StyledLayout>
                <Container>
                    <UserCard userId={userId} />
                </Container>
                <Container>
                    <MyGroups userId={userId} />
                </Container>
            </StyledLayout>
        </motion.div>
    )
}

export default MyPage

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Container = styled.div`
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
