import api from './index'

export const getGroups = async () => {
    const response = await api.get('/group')
    return response.data
}
