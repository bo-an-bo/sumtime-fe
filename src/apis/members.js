import { authAPI, formApi } from './index'

export const getMember = async (groupId) => {
    try {
        const response = await authAPI.get(`group/${groupId}/member`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addMember = async (groupId, name, memberInfo) => {
    console.log(name, memberInfo)
    const response = await authAPI.post(`group/${groupId}/member`, [
        {
            name,
            memberInfo,
        },
    ])
    return response.data
}

export const deleteMember = async (groupId, memberId) => {
    const response = await authAPI.delete(`group/${groupId}/member`, {
        data: memberId,
    })
    return response.data
}

export const uploadMember = async (groupId, file) => {
    const formData = new FormData()
    formData.append('memberFile', file)
    const response = await formApi.post(`group/${groupId}/member/excel`, formData)
    return response.data
}
