import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './hoc/main_layout';
import Header from './components/navigation/header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { Loader } from './utilis/tools';
import { isAuth } from './store/actions/users'
//Main components
import Home from './components/home';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import AuthGuard from './hoc/auth_guard';
import Article from './components/articles/article';
import Contact from './components/contact';
import Footer from './components/footer';


import DashboardMain from './components/dashboard/main';
import AdminArticles from './components/dashboard/articles';
import UserArticles from './components/dashboard/user_articles';
import AdminProfile from './components/dashboard/profile';
import AddArticle from './components/dashboard/articles/edit_add/add';
import EditArticle from './components/dashboard/articles/edit_add/edit';
import AdminCategories from './components/dashboard/categories';

const Router = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(isAuth())
  }, [])
  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users])


  return (
    <BrowserRouter>
      {loading ?
        <Loader />
        :
        <>
          <Header />
          
          <MainLayout>
            <Routes>

              <Route path='/dashboard' element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } >
                <Route index element={< DashboardMain />} />
                <Route path='profile' element={<AdminProfile />} />
                <Route path='user_articles' element={<UserArticles />} />
                <Route path='articles' element={<AdminArticles />} />
                <Route path='articles/add' element={<AddArticle />} />
                <Route path='articles/edit/:articleId' element={<EditArticle />}  />
                <Route path='categories' element={<AdminCategories />} />
              </Route >
             
              <Route path='/articles/article/:id' element={<Article />} />
              <Route path='/auth' element={<Auth />} />
              
              <Route path='/' element={<Home /> }  />
              <Route path='/contact' element={<Contact />} />
             
            </Routes>
          </MainLayout>
            <Footer/>
              
        </>
      }
    </BrowserRouter>
  )
}

export default Router;