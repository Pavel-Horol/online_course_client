import { makeAutoObservable } from "mobx"
import { IUser } from "../models/IUser"
import AuthService from "../services/AuthService";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import axios from "axios";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    constructor() {
        makeAutoObservable(this);
    }
    setLoading(bool: boolean) {
        this.isLoading = bool
    }
    setAuth(bool: boolean) {
        this.isAuth = bool
    }
    setUser(user: IUser) {
        this.user = user
    }

    async registration(email: string, password: string) {
        try{
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
        
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            this.handleError(e)
        }
    } 

    async login(email: string, password: string) {
        try{
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
        
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch(e) {
            this.handleError(e)
        }
    } 

    async logout() {
        try{
            await AuthService.logout()
            localStorage.removeItem('token')
        
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch(e) {
            this.handleError(e)
        }
    } 

    private handleError(e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }
        if (typeof e === 'object' && e !== null && 'response' in e) {
            const axiosError = e as { response?: { data?: { message?: string } } };
            console.log(axiosError.response?.data?.message);
        } else {
            console.log('An unknown error occurred');
        }
    }

    async checkAuth() {
        try {
            this.isLoading = true
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            
            localStorage.setItem('token', response.data.accessToken)    
            this.setAuth(true)
            this.setUser(response.data.user)            
        } catch (error) {
           console.error(error) 
        }finally {
            this.isLoading = false
        }
    }
}