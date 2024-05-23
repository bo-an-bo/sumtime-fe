// import { GroupSizeContext } from 'antd/es/button/button-group'
import axios from 'axios'

const api = axios.create({
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

export const kakaoAPI = axios.create({
    baseURL: 'https://kapi.kakao.com/v1/api/talk',
})

export const authInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// api.interceptors.request.use(
//     (config) => {
//         console.log(config)
//         return config
//     },
//     function (error) {
//         console.log('request error', error)
//         return Promise.reject(error)
//     },
// )

// api.interceptors.response.use(
//     function (response) {
//         console.log('get response', response)
//         return response
//     },
//     async (error) => {
//         const {
//             config,
//             response: { status },
//         } = error
//         if (status === 401) {
//             if (error.response.data.message === 'expired') {
//                 const originalRequest = config
//                 const refreshToken = await localStorage.getItem('refreshToken')
//                 const { data } = await axios.post(
//                     `http:://localhost:3000/refreshToken`,
//                     {},
//                     { headers: { Authorization: `Bearer ${refreshToken}` } },
//                 )
//             }
//         }
//     },
// )
export default api
