// GroupCard.js

import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { getGroups } from '../../apis/groups'

const GroupCard = () => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getGroups().then((data) => {
            setGroups(data)
        })
    }, [])
    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    {groups.map((group) => (
                        <Link to={`/group/${group._id}/showGroupDetails`} key={group._id}>
                            <Card title={group.name} bordered={false}>
                                {group.description}
                            </Card>
                        </Link>
                    ))}
                </Col>
            </Row>
        </div>
    )
}

export default GroupCard
