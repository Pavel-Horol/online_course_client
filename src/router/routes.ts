

const routes = {
    home: {
        path: '/',
        name: 'Home',
        include: true
    },
    about: {
        path: '/about',
        name: 'About',
        include: true
    },
    auth: {
        path: '/auth',
        name: 'Auth',
        include: false
    },
    profile: {
        path: '/profile',
        name: 'Profile', 
        include: true
    }
}

export default routes