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
    const response = await formApi.post('/group', groupInfo)
    return response.data
}
