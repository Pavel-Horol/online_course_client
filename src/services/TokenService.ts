class TokenService {
    setToken(token: string) {
        return localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    removeToken() {
        return localStorage.removeItem('token');
    }
}

export default new TokenService();
