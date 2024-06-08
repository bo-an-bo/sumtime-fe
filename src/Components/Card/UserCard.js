import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd'

const UserCard = ({ userId }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser({
            img: localStorage.getItem('profileImg'),
            nickname: localStorage.getItem('nickname'),
            userId: userId,
        })
    }, [userId])

    return (
        <StyledCard>
            <Avatar size={100} src={user.img} style={{ marginBottom: 20 }} />
            <UserName>{user.nickname}</UserName>
            <UserId>사용자 ID: {user.userId}</UserId>
        </StyledCard>
    )
}

export default UserCard

const StyledCard = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 80vw;
`

const UserName = styled.h2`
    margin-bottom: 8px;
`

const UserId = styled.p`
    color: #888;
`
