import { formApi } from './index'

export const createTransaction = async (groupId, password, file) => {
    const formData = new FormData()
    formData.append('password', password)
    formData.append('transactionFile', file)
    const response = await formApi.post(`/group/${groupId}/transaction/excel`, formData)
    return response.data
}
