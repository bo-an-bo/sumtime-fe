import { authAPI } from './index'

export const postRole = async (groupId, userId, role) => {
    const response = await authAPI.post(`/group/${groupId}/user/${userId}?role=${role}`)
    return response.data
}

export const patchRole = async (groupId, userId, role) => {
    const response = await authAPI.patch(`/group/${groupId}/user/${userId}?role=${role}`)
    return response.data
}
