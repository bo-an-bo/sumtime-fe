import api from './index'

export const getMember = async (groupId) => {
    try {
        const response = await api.get(`group/${groupId}/member`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addMember = async (groupId, name, memberInfo) => {
    const response = await api.post(`group/${groupId}/member`, {
        name,
        memberInfo,
    })
    return response.data
}

export const deleteMember = async (groupId, memberId) => {
    const response = await api.delete(`group/${groupId}/member/${memberId}`)
    return response.data
}
