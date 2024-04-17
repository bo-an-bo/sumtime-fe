import api from './index'

export const getMembers = async () => {
    const response = await api.get('/members')
    return response.data
}
