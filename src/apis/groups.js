import { authAPI, formApi } from './index'

export const getGroups = async () => {
    const response = await authAPI.get('/group')
    return response.data
}

export const getGroupDetail = async (groupId) => {
    const response = await authAPI.get(`/group/${groupId}`)
    return response.data
}

export const createGroup = async (groupInfo) => {
    console.log(groupInfo)
    const response = await formApi.post('/group', groupInfo)
    return response.data
}

export const patchGroup = async (groupInfo) => {
    console.log('patchGroup에서')
    console.log(groupInfo)
    const response = await authAPI.patch(`/group/${groupInfo.groupId}`, {
        name: groupInfo.name,
        description: groupInfo.description,
    })
    return response.data
}

export const deleteGroup = async (groupId) => {
    const response = await authAPI.delete(`/group/${groupId}`)
    return response.data
}
