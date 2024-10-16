export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
}

export interface UserState {
    user: IUser;
    isAuth: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
