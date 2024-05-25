import { authAPI, formApi } from './index'

export const createTransaction = async (groupId, password, file) => {
    const formData = new FormData()
    formData.append('password', password)
    formData.append('transactionFile', file)
    const response = await formApi.post(`/group/${groupId}/transaction/excel`, formData)
    return response.data
}

export const getTransactions = async (groupId, eventId) => {
    const response = await authAPI.get(`/group/${groupId}/event/${eventId}/transaction`)
    return response.data
}
