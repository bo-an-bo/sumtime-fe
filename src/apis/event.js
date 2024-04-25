import api from './index'

export const postEvent = async (groupId, eventInfo) => {
    await api.post(`group/${groupId}/event`, eventInfo)
}

export const getEvent = async (groupId) => {
    const response = await api.get(`group/${groupId}/event`)
    return response.data
}
