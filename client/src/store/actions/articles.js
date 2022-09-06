import axios from "axios";
import { errorGlobal, successGlobal } from '../reducers/notifications';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {updateCategories}from '../reducers/articles'
import { getAuthHeader } from '../../utilis/tools';



export const addArticle = createAsyncThunk(
    'article/addArticle',
    async (article, { dispatch }) => {
        try {
            const request = await axios.post(`/api/articles/`, article, getAuthHeader())
            dispatch(successGlobal('post created'))
            return request.data;
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)
export const getAdminArticle = createAsyncThunk(
    'article/getAdminArticle',
    async (_id, { dispatch }) => {
        try {
            const request = await axios.get(`/api/articles/article/${_id}`, getAuthHeader())

            return request.data;
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)

export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async ({ values, articleId }, { dispatch }) => {
        try {
            await axios.patch(`/api/articles/article/${articleId}`, values, getAuthHeader())
            dispatch(successGlobal('Article updated successfully'))
            return true
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
);

export const getPaginateArticles = createAsyncThunk(
    'article/getPaginateArticles',
    async ({ page = 1, limit = 5, keywords = '' }, { dispatch }) => {
        try {
            const request = await axios.post(`/api/articles/admin/paginate`, {
                page,
                limit,
                keywords
            }, getAuthHeader())
            return request.data;
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)

export const changeStatusArticle = createAsyncThunk(
    'article/changeStatusArticle',
    async ({ newStatus, _id }, { dispatch, getState }) => {
        try {
            const request = await axios.patch(`/api/articles/article/${_id}`, {
                status: newStatus
            }, getAuthHeader());
            let article = request.data;
            /// prev state
            let state = getState().articles.adminArticles.docs;
            let position = state.findIndex(article => article._id === _id);
            const newState = [...state]
            newState[position] = article;
            dispatch(successGlobal('Status changed'))
            return newState;
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)

export const removeArticle = createAsyncThunk(
    'article/removeArticle',
    async (_id, { dispatch, getState }) => {
        try {
            await axios.delete(`/api/articles/article/${_id}`,

                getAuthHeader())
            let page = getState().articles.adminArticles.page
            dispatch(successGlobal('Article removed successfully'))
            dispatch(getPaginateArticles({ page }))
            return true
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)
export const homeLoadMore = createAsyncThunk(
    'article/homeLoadMore',
    async (sort, { dispatch, getState }) => {
        try {
           const articles = await axios.post(`/api/articles//all`,sort);
           const state = getState().articles.articles;
           const prevState = [...state]
           const newState = [...prevState,...articles.data];

           return {newState,sort}
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)
export const getArticle = createAsyncThunk(
    'article/getArticle',
    async (id, { dispatch,}) => {
        try {
          const request = await axios.get(`/api/articles/users/article/${id}`)
          return request.data
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)
export const getCategories = createAsyncThunk(
    'article/getCategories',
    async (obj, { dispatch}) => {
        try {
          const request = await axios.get(`/api/articles/categories`,getAuthHeader())
          return request.data
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)
export const addCategories = createAsyncThunk(
    'article/addCategories',
    async (data, { dispatch,getState}) => {
        try {
         const category =await axios.post('/api/articles/categories', data,getAuthHeader())
         const state = getState().articles.categories
         const prevState = [...state];
         const newState = [...prevState, category.data]
         dispatch(updateCategories(newState));
         dispatch(successGlobal('Category created'))
         return newState

        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)