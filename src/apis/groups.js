import api from './index'

export const getGroups = async () => {
    const response = await api.get('/group')
    return response.data
}

export const postGroup = async (gropuData) => {
    try {
        const response = await api.post('/group', gropuData)
        return response.data
    } catch (error) {
        console.error('Eroor posting group : ', error)
        throw error
    }
}
