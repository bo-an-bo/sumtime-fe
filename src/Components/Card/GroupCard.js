// GroupCard.js

import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { getGroups } from '../../apis/groups'
import styled from 'styled-components'
import SideBar from '../SideBar/SideBar'
const StyledBox = styled.div`
    display: flex;
    width: 100%;
`

const StyledRow = styled(Row)`
    width: 100%;
    margin: 10px;
    padding: 10px;
`

const StyledCol = styled(Col)`
    width: 100%;
    margin: 10px;
    padding: 10px;
`

const StyledCard = styled(Card)`
    width: 100%;
    background-color: #f9fbff;
    margin: 20px;
    transition-duration: 0.3s, 0.3s;
    border: 2px solid #f0f0f0;
    &:hover {
        background-color: #ecf4ff;
    }
`
const GroupCard = () => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getGroups().then((data) => {
            setGroups(data)
        })
    }, [])
    return (
        <StyledBox>
            <StyledRow gutter={16}>
                <StyledCol span={8}>
                    {groups.map((group) => (
                        <Link to={`/group/${group._id}`} key={group._id}>
                            <SideBar group_id={group._id} />
                            <StyledCard title={group.name} bordered={false}>
                                {group.description}
                            </StyledCard>
                        </Link>
                    ))}
                </StyledCol>
            </StyledRow>
        </StyledBox>
    )
}

export default GroupCard
