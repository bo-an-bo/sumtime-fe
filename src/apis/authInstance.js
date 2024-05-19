import axios from 'axios'

const authInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

authInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

export default authInstance
