/* eslint-disable @typescript-eslint/ban-ts-comment */
import TokenService from '@/services/TokenService';
import { AuthResponse } from '@/types/response/AuthResponse';
import axios from "axios"

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${TokenService.getToken()}`
    return config
}, (error) => {
    return Promise.reject(error)
})

$api.interceptors.response.use(config => {
    return config
}, async error => {
    const originRequest = error.config
    if ( error.response.status === 401 && !originRequest._retry ) {
        originRequest._retry = true 
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            TokenService.setToken(response.data.accessToken)
            
            return $api.request(originRequest)
        } catch(error){
            //@ts-ignore
            console.log('Auth error:', error.response.data.message)
        }
    }
    throw error
})

export default $api