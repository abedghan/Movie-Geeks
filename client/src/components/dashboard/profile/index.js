import { AdminTitle } from "../../../utilis/tools";
import UserProfile from "./profile";
import AuthProfile from "./auth";





const AdminProfile = () => {


    return (
        <>
        <AdminTitle title ='Profile' />
        <AuthProfile/>
           <UserProfile/>
        </>
    )


}


export default AdminProfile ;
