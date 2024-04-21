import api from './index'

export const getMember = async (groupId) => {
    const response = await api.get(`group/${groupId}/member`)
    return response.data
}

export const addMember = async (groupId, name, phoneNumber, studentId) => {
    const response = await api.post(`group/${groupId}/member`, {
        name,
        phoneNumber,
        memberInfo: {
            studentId,
        },
    })
    return response.data
}

export const deleteMember = async (groupId, memberId) => {
    const response = await api.delete(`group/${groupId}/member/${memberId}`)
    return response.data
}
