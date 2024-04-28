import axios from 'axios'

const api = axios.create({
    baseURL: 'https://sumtime-be.w8385.dev',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const formApi = axios.create({
    baseURL: 'https://sumtime-be.w8385.dev',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export default api
