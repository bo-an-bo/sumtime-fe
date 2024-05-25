import { authAPI } from './index'

export const postEvent = async (groupId, eventInfo) => {
    const response = await authAPI.post(`group/${groupId}/event`, eventInfo)
    return response.data
}

export const getEvent = async (groupId) => {
    const response = await authAPI.get(`group/${groupId}/event`)
    return response.data
}

export const getEventDetail = async (groupId, eventId) => {
    const response = await authAPI.get(`group/${groupId}/event/${eventId}`)
    return response.data
}


export const postEventMember = async (groupId, eventId, meminfo) => {
    try {
        return await authAPI.post(`group/${groupId}/event/${eventId}/member`, meminfo)
    } catch (error) {
        console.error('Error posting event member:', error.response ? error.response.data : error.message)
        throw error
    }
}
