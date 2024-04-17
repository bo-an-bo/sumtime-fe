import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { getGroups } from '../../apis/groups'
const ShowGroupList = () => {
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
                        <GroupCard key={group._id} group={group} />
                    ))}
                </Col>
            </Row>
        </div>
    )
}

const GroupCard = ({ group }) => {
    return (
        <Link to={`/group/${group._id}/showGroupDetails`}>
            <Card title={group.name} style={{ marginBottom: '16px' }}>
                <p>{group.description}</p>
            </Card>
        </Link>
    )
}
GroupCard.propTypes = {
    group: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
}
export default ShowGroupList
