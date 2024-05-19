import axios from 'axios'

// Axios 인스턴스 생성
const authInstance = axios.create({
    baseURL: 'http://localhost:5354 ',
    headers: {
        'Content-Type': 'application/json',
    },
})

// 요청 인터셉터 설정
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
