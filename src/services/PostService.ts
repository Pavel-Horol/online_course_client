import $api from '@/api';
class PostService {
    async create({ title, content }: {title: string, content: string}) {
        return await $api.post('/posts/create', {title, content})    
    }
    async getAll() {
        return await $api.get('/posts/all')
    } 
}

export default new PostService()