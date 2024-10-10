import $api from "@/api";

class UserService {
    async getProfile() {
        const userData = await $api.get('/auth/profile')
        return userData
    }
    async activateEmail() {
        return await $api.get('/auth/getActivationLink')
    }

}

export default new UserService ()