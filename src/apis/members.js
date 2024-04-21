import api from './index'

export const getMember = async (groupId) => {
    const response = await api.get(`group/${groupId}/member`)
    return response.data
}

export const addMember = async (groupId, name, memberInfo) => {
    const response = await api.post(`group/${groupId}/member`, {
        name,
        memberInfo: {
            studentId: memberInfo.studentId,
            email: memberInfo.email,
            phoneNumber: memberInfo.phoneNumber,
        },
    })
    return response.data
}

export const deleteMember = async (groupId, memberId) => {
    const response = await api.delete(`group/${groupId}/member/${memberId}`)
    return response.data
}
