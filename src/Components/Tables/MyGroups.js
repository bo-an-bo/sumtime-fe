import React, { useState, useEffect } from 'react'
import { getGroups } from '../../apis/groups'
import { Tabs, Table } from 'antd'
import styled from 'styled-components'

const MyGroups = ({ userId }) => {
    const [ownerGroups, setOwnerGroups] = useState([])
    const [editorGroups, setEditorGroups] = useState([])
    const [viewerGroups, setViewerGroups] = useState([])

    useEffect(() => {
        getGroups().then((data) => {
            categorizeGroups(data)
        })
    })

    const categorizeGroups = (groups) => {
        const owners = []
        const editors = []
        const viewers = []

        groups.forEach((group) => {
            if (group.auth.owner.includes(userId)) {
                owners.push(group.name)
            } else if (group.auth.editors.includes(userId)) {
                editors.push(group.name)
            } else if (group.auth.viewers.includes(userId)) {
                viewers.push(group.name)
            }
        })

        setOwnerGroups(owners)
        setEditorGroups(editors)
        setViewerGroups(viewers)
    }

    const columns = [
        {
            title: '그룹 이름',
            dataIndex: 'groupName',
            key: 'groupName',
        },
    ]

    const items = [
        {
            key: 'owner',
            label: '내 모임',
            children: ownerGroups.map((groupName, index) => ({ key: index, groupName })),
        },
        {
            key: 'editor',
            label: '편집자',
            children: editorGroups.map((groupName, index) => ({ key: index, groupName })),
        },
        {
            key: 'viewer',
            label: '조회자',
            children: viewerGroups.map((groupName, index) => ({ key: index, groupName })),
        },
    ]

    return (
        <CustomTabs
            defaultActiveKey="1"
            tabPosition="top"
            items={new Array(3).fill(0).map((_, index) => ({
                key: index,
                label: items[index].label,
                children: (
                    <Table
                        columns={columns}
                        dataSource={items[index].children}
                        pagination={false}
                        scroll={{ y: 200 }}
                    />
                ),
            }))}
        />
    )
}

export default MyGroups

// 탭의 스타일 정의
const CustomTabs = styled(Tabs)`
    .ant-tabs-nav {
        font-weight: bold;
        height: 50px;
    }
    .ant-tabs-tab {
        margin: 0;
        padding: 0 20px;
    }
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 340px;
`
