import {Outlet} from 'react-router-dom';
import AdminLayout from '../../hoc/admin_layout';
import { useSelector } from 'react-redux';



const Dashboard = ()=>{
const user = useSelector(state => state.users)

    return(

        <AdminLayout>
        <Outlet/>
        
        </AdminLayout>
    )
}

export default Dashboard ;