import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from './reducers/users'
import ArticlesReducer from './reducers/articles';
import notificationsReducer from './reducers/notifications';
import siteReducer from './reducers/site';
export const store = configureStore({
    reducer: {
        users: UsersReducer,
        articles: ArticlesReducer,
        notifications:notificationsReducer,
        site :siteReducer
    }


})