import $api from "@/api";

class AuthService {
    async login (email: string, password: string)  {
        return await $api.post('/auth/login', {email, password})
    }
    async registration (email: string, password: string)  {
        return await $api.post('/auth/registration', {email, password})
    }

    async refresh() {
        return await $api.get('/auth/refresh', {withCredentials: true})
    }
    async logout(){
        return await $api.post('/auth/logout')
    }
}

export default new AuthService()