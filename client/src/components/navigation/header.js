import { Link,useNavigate ,useLocation} from 'react-router-dom'
import SideNavigation from './sideNavigation';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import { clearNotifications } from '../../store/reducers/notifications';
import {signOut} from '../../store/actions/users'
import { showToast } from '../../utilis/tools';
import {setLayout } from '../../store/reducers/site'
const Header = () => {
    const users = useSelector((state) => state.users)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();
    const site = useSelector(state => state.site)

    useEffect(() => {
        let pathname = location.pathname.split('/')
        if (pathname[1] === 'dashboard'){
            dispatch(setLayout('dash_layout'))
        }else{
            dispatch(setLayout(''))
        }
    },[location.pathname,dispatch])

    useEffect(() => {
        let { global } = notifications;
        if (notifications && global.error) {
            const msg = global.msg ? global.msg : 'Error'
            showToast('ERROR', msg)
            dispatch(clearNotifications())

        }
        if (notifications && global.success) {
            const msg = global.msg ? global.msg : 'success'
            showToast('SUCCESS', msg)
            dispatch(clearNotifications())
        }
    }, [notifications])

    const signOutUser = () => {

        dispatch(signOut())
        navigate('/')
    }


    return (
        <>
         
        
        <nav className={`navbar fixed-top ${site.layout} `}>
            <Link to='/' className="navbar-brand d-flex align-items-center fredoka_ff">
                Movie Geeks
            </Link>
            <SideNavigation users={users} signOutUser={signOutUser} />
        </nav>
       
        </>
    )
}


export default Header;