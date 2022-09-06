import axios from "axios";
import { errorGlobal, successGlobal } from '../reducers/notifications'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthHeader, removeTokenCookie } from '../../utilis/tools'

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async ({ email, password }, { dispatch }) => {
        try {
            const request = await axios.post(`/api/auth/register`, {
                email: email,
                password: password
            });
            dispatch(successGlobal('welcome!!Please Go to your Profile tp set your account'))
            return { data: request.data.user, auth: true }
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
);
export const signInUser = createAsyncThunk(
    'users/signInUser',
    async ({ email, password }, { dispatch }) => {
        try {
            const request = await axios.post(`/api/auth/signin`, {
                email: email,
                password: password
            });
            dispatch(successGlobal('welcome!!!! '))
            return { data: request.data.user, auth: true }
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
);

export const isAuth = createAsyncThunk(
    'users/isAuth',
    async () => {
        try {
            const request = await axios.get('/api/auth/isauth', getAuthHeader())
            return { data: request.data, auth: true }
        } catch (error) {
            return { data: {}, auth: false }
        }
    }

)
export const signOut = createAsyncThunk(
    'users/signOut',
    async () => {
        removeTokenCookie();
    }

)
export const updateUserProfile = createAsyncThunk(
    'users/updateUserProfile',
    async (data, { dispatch }) => {
        try {
            const profile = await axios.patch(`/api/users/profile`, data, getAuthHeader())
            dispatch(successGlobal('profile updated '))
            return {
                firstname: profile.data.firstname,
                lastname: profile.data.lastname,
                age: profile.data.age
            }
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }

)

export const updateUserEmail = createAsyncThunk(
    'users/updateUserEmail',
    async (data, { dispatch }) => {
        try {
            const request = await axios.patch(`/api/users/email`, {
                email: data.email,
                newemail: data.newemail,
            }, getAuthHeader())
            dispatch(successGlobal('Email updated '))
            return {
                email: request.data.user.email,
                verified: false
            }
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error
            
        }
    }
    
)
export const contactUs = (data)=>{
return async (dispatch)=>{
    try{
        await axios.post(`/api/users/contact`,data)
        dispatch(successGlobal('Message Sent we will answer your email as soon as possible '))
    }catch(error){
        dispatch(errorGlobal(error.response.data.message))
        throw error
    }
}
}
