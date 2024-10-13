import $api from "@/api";

class UserService {
    async uploadPhoto(file: File) {
        console.log('file',file)
        const formData = new FormData()
        formData.append('file', file)
    
        console.log('formData ', formData)
        const userData = await $api.post('/auth/uploadPhoto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return userData
    }
    async getProfile() {
        const userData = await $api.get('/auth/profile')
        return userData
    }
    async activateEmail() {
        return await $api.get('/auth/getActivationLink')
    }

}

export default new UserService ()