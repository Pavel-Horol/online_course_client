import $api from '@/api';

class UserService {
    async uploadPhoto(file: File) {
        const formData = new FormData();
        formData.append('image', file);
        const userData = await $api.post('/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return userData;
    }
    async getProfile() {
        const userData = await $api.get('/auth/profile');
        return userData;
    }
    async activateEmail() {
        return await $api.get('/auth/getActivationLink');
    }
}

export default new UserService();
