import api from './index'
import { formApi } from './index'

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

export const uploadMember = async (groupId, file) => {
    console.log(groupId)
    console.log(file)

    const formData = new FormData()
    formData.append('memberFile', file)
    const response = await formApi.post(`group/${groupId}/member/excel`, formData)
    return response.data
}
