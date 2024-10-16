/* eslint-disable @typescript-eslint/ban-ts-comment */
import AuthService from '@/services/AuthService';
import TokenService from '@/services/TokenService';
import { IUser, UserState } from '@/types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    status: 'idle',
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await AuthService.login(email, password);
            return {
                user: response.data.user,
                accessToken: response.data.accessToken,
            };
        } catch (error) {
            console.log('Error in userSlice loginUser', error);
            return rejectWithValue('Login failed');
        }
    },
);

export const registerUser = createAsyncThunk(
    'user/register',
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await AuthService.registration(email, password);
            return {
                user: response.data.user,
                accessToken: response.data.accessToken,
            };
        } catch (error) {
            console.log('Error in userSlice registerUser', error);
            return rejectWithValue('Registration failed');
        }
    },
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
    try {
        await AuthService.logout();
        TokenService.removeToken();
    } catch (error) {
        console.log(error);
    }
});

export const checkAuthUser = createAsyncThunk(
    'user/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const token = TokenService.getToken();
            if (!token) {
                return rejectWithValue('No token found');
            }

            const response = await AuthService.refresh();
            if (response.status === 200) {
                return {
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                };
            } else {
                return rejectWithValue('Failed to refresh token');
            }
        } catch (error) {
            //@ts-ignore
            console.log(error.response?.data?.message || 'unexpected error');
            //@ts-ignore
            return rejectWithValue(error.response?.data);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // login
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = action.payload.user;
                TokenService.setToken(action.payload.accessToken);
                state.isAuth = true;
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state) => {
                console.log('Error in userSlice/loginUsee.rejected');
                state.isAuth = false;
                state.status = 'failed';
            });

        // registration
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = action.payload.user;
                TokenService.setToken(action.payload.accessToken);
                state.isAuth = true;
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state) => {
                console.log('Error in userSlice/registerUsee.rejected');
                state.isAuth = false;
                state.status = 'failed';
            });

        // logout
        builder
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = {} as IUser;
                TokenService.removeToken();
                state.isAuth = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.status = 'failed';
            });

        // check auth
        builder
            .addCase(checkAuthUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuthUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                TokenService.setToken(payload.accessToken);
                state.isAuth = true;
                state.status = 'succeeded';
            })
            .addCase(checkAuthUser.rejected, (state) => {
                state.isAuth = false;
                state.status = 'failed';
            });
    },
});

export default userSlice.reducer;
