import React, { useEffect, useState, useCallback } from 'react'
import { getMember } from '../../apis/members'
import { getGroupDetail } from '../../apis/groups'
import { postRole, patchRole } from '../../apis/user'
import { Table, Button, Modal, Input, message } from 'antd'
import styled from 'styled-components'

const Role = {
    EDITOR: 'editor',
    VIEWER: 'viewer',
}

const SelectManager = ({ groupId }) => {
    const [members, setMembers] = useState([])
    const [memberKeys, setMemberKeys] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedRole, setSelectedRole] = useState('')
    const [userIdInput, setUserIdInput] = useState('')
    const [auth, setAuth] = useState({ owner: [], editors: [], viewers: [] })
    const [roleUpdated, setRoleUpdated] = useState(false)

    const fetchMembersAndAuth = useCallback(async () => {
        const memberData = await getMember(groupId)
        setMembers(memberData.members)
        const groupDetailData = await getGroupDetail(groupId)
        setAuth(groupDetailData.auth)
    }, [groupId])

    useEffect(() => {
        fetchMembersAndAuth()
    }, [fetchMembersAndAuth, roleUpdated])

    useEffect(() => {
        const keys = Object.keys(members[0]?.memberInfo || {})
        setMemberKeys(keys)
    }, [members])

    const showModal = (role) => {
        setSelectedRole(role)
        setIsModalVisible(true)
    }

    const handleOk = async () => {
        setLoading(true)
        try {
            const { owner, editors, viewers } = auth
            if (owner.includes(userIdInput)) {
                message.error('해당 유저는 이미 오너입니다.')
                return
            }
            if (selectedRole === Role.EDITOR) {
                if (editors.includes(userIdInput)) {
                    message.error('해당 유저는 이미 에디터입니다.')
                } else if (viewers.includes(userIdInput)) {
                    await patchRole(groupId, userIdInput, Role.EDITOR)
                    message.success('뷰어에서 에디터로 성공적으로 변경되었습니다.')
                } else {
                    await postRole(groupId, userIdInput, Role.EDITOR)
                    message.success('유저가 에디터로 성공적으로 초대되었습니다.')
                }
            } else if (selectedRole === Role.VIEWER) {
                if (viewers.includes(userIdInput)) {
                    message.error('해당 유저는 이미 뷰어입니다.')
                } else if (editors.includes(userIdInput)) {
                    await patchRole(groupId, userIdInput, Role.VIEWER)
                    message.success('에디터에서 뷰어로 성공적으로 변경되었습니다.')
                } else {
                    await postRole(groupId, userIdInput, Role.VIEWER)
                    message.success('유저가 뷰어로 성공적으로 초대되었습니다.')
                }
            }
            // Update roleUpdated state to trigger re-render
            setRoleUpdated(!roleUpdated)
        } catch (err) {
            message.error('작업 중 오류가 발생했습니다.')
        } finally {
            setLoading(false)
            setIsModalVisible(false)
            setUserIdInput('')
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false)
        setUserIdInput('')
    }

    const columns = [
        {
            title: '순',
            dataIndex: 'index',
        },
        {
            title: '이름',
            dataIndex: 'name',
        },
        ...memberKeys.map((key) => ({
            title: key,
            dataIndex: key,
        })),
        {
            title: '권한 설정',
            render: () => (
                <div>
                    <Button type="primary" onClick={() => showModal(Role.EDITOR)} style={{ marginRight: '8px' }}>
                        Editor
                    </Button>
                    <Button onClick={() => showModal(Role.VIEWER)}>Viewer</Button>
                </div>
            ),
        },
    ]

    const data = members.map((member, index) => ({
        _id: member._id,
        key: index,
        index: index + 1,
        name: member.name,
        ...member.memberInfo,
    }))

    return (
        <StyledLayout>
            <Wrapper>
                <StyledTable columns={columns} dataSource={data} pagination={false} scroll={{ y: 450 }} />
                <Modal
                    title="유저 ID 입력"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    confirmLoading={loading}
                >
                    <Input
                        placeholder="유저 ID를 입력하세요"
                        value={userIdInput}
                        onChange={(e) => setUserIdInput(e.target.value)}
                    />
                </Modal>
            </Wrapper>
        </StyledLayout>
    )
}

export default SelectManager

const StyledLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Wrapper = styled.div`
    width: 100%;
    border-radius: 20px;
`

const StyledTable = styled(Table)`
    .ant-table-thead > tr > th {
        border-bottom: 2px solid #d9d9d9;
        font-size: 16px;
        text-align: center;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Bold', 'serif';
    }

    .ant-table-tbody > tr > td {
        border-bottom: 1px solid #d9d9d9;
        font-size: 15px;
        text-align: center;
        padding: 10px;
        background-color: rgba(0, 62.67, 151.94, 0.04);
        font-family: 'Dotum Medium', 'serif';
    }

    .ant-table-tbody > tr:last-child > td {
        border-bottom: none;
    }
`
