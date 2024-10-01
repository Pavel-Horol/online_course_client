import $api from "@/api";

export default class AuthService {
    static async login (email: string, password: string)  {
        return await $api.post('/login', {email, password})
    }
    static async registration (email: string, password: string)  {
        return await $api.post('/registration', {email, password})
    }

    static async refresh() {
        return await $api.get('/refresh', {withCredentials: true})
    }
    static async logout(){
        return await $api.post('/logout')
    }
}