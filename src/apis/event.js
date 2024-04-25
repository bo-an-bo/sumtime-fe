import api from './index'

export const postEvent = async (groupId, eventInfo) => {
    const response = await api.post(`group/${groupId}/event`, eventInfo)
    return response.data
}

export const getEvent = async (groupId) => {
    const response = await api.get(`group/${groupId}/event`)
    return response.data
}
