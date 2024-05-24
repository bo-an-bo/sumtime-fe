import api from './index'
import axios from 'axios'

export const postEvent = async (groupId, eventInfo) => {
    const response = await api.post(`group/${groupId}/event`, eventInfo)
    return response.data
}

export const getEvent = async (groupId) => {
    const response = await api.get(`group/${groupId}/event`)
    return response.data
}

export const getEventDetail = async (groupId, eventId) => {
    const response = await axios.get(`http://localhost:5354/group/${groupId}/event/${eventId}`)
    return response.data
}


export const postEventMember = async (groupId, eventId, meminfo) => {
    try {
        return await api.post(`group/${groupId}/event/${eventId}/member`, meminfo)
    } catch (error) {
        console.error('Error posting event member:', error.response ? error.response.data : error.message)
        throw error
    }
}
