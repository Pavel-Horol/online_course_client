import TokenService from '@/services/TokenService';
import axios from "axios"

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${TokenService.getToken()}`
    return config
})

$api.interceptors.response.use(config => {
    return config
}, async error => {
    const originRequest = {...error.config}
    originRequest._isRetry = true 
    if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
    ) {
        try{
            const response = await $api.get('/refresh')
            TokenService.setToken(response.data.accessToken)
            
            return $api.request(originRequest)
        } catch(error){
            console.log('Auth error', error)
        }
    }
    throw error
})

export default $api