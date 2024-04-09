import React from 'react'
import { Card, Col, Row } from 'antd'

const dummy = {
    users: [{ userId: 1 }, { userId: 2 }, { userId: 3 }],

    groups: [
        {
            id: 1,
            name: '모임1',
            descript: '모임1입니다.',
        },
        {
            id: 2,
            name: '모임2',
            descript: '모임2입니다.',
        },
        {
            id: 3,
            name: '모임3',
            descript: '모임3입니다.',
        },
    ],
}

console.log(dummy)
const ShowGroupList = () => {
    return (
        <div>
            <div>나의 모임</div>
            <Row gutter={16}>
                <Col span={8}>
                    {dummy.groups.map((data) => (
                        <Card title={data.name} bordered={false} key={data.id}>
                            {data.descript}
                        </Card>
                    ))}
                </Col>
            </Row>
            {/* <Row gutter={16}>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row> */}
        </div>
    )
}

export default ShowGroupList
