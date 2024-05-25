import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const formApi = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

formApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export const kakaoAPI = axios.create({
    baseURL: 'https://kapi.kakao.com/v1/api/talk',
})

export const authAPI = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

authAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
export default api

