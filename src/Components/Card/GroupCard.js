import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { getGroups } from '../../apis/groups'
import styled from 'styled-components'

const GroupCard = () => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getGroups().then((data) => {
            setGroups(data)
        })
    }, [])

    const renderGroupCards = () => {
        return groups.map((group) => (
            <Col key={group._id} span={12}>
                <Link to={`/group/${group._id}`}>
                    <StyledCard title={group.name} bordered={false}>
                        {group.description}
                    </StyledCard>
                </Link>
            </Col>
        ))
    }

    return (
        <StyledBox>
            <StyledRow gutter={[16, 16]}>{renderGroupCards()}</StyledRow>
        </StyledBox>
    )
}

export default GroupCard

const StyledBox = styled.div`
    display: flex;
    width: 100%;
`

const StyledRow = styled(Row)`
    width: 90%;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const StyledCard = styled(Card)`
    background-color: #f9fbff;
    margin-left: 100px;

    @media (max-width: 768px) {
        margin-left: 0;
    }

    transition-duration: 0.3s, 0.3s;
    border: 2px solid #f0f0f0;
    &:hover {
        background-color: #ecf4ff;
    }
    font-family: 'Dotum Bold';
    font-size: 18px;
`
