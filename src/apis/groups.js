import api from './index'
import { formApi } from './index'

export const getGroups = async () => {
    const response = await api.get('/group')
    return response.data
}

export const getGroupDetail = async (groupId) => {
    const response = await api.get(`/group/${groupId}`)
    return response.data
}

export const createGroup = async (groupInfo) => {
    console.log(groupInfo)
    const response = await formApi.post('/group', groupInfo)
    return response.data
}

export const patchGroup = async (groupInfo) => {
    console.log(groupInfo)
    const response = await api.patch(`/group/${groupInfo.groupId}`, {
        name: groupInfo.name,
        description: groupInfo.description,
    })
    return response.data
}

export const deleteGroup = async (groupId) => {
  console.log(groupId)
  const response = await api.delete(`/group/${groupId}`, groupId)
  return response.data;
}
