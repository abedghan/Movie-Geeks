import { useState, useEffect } from "react";

import { useFormik } from "formik";
import { Loader } from "../../utilis/tools";
import { errorHelper } from "../../utilis/tools";
import { contactUs } from "../../store/actions/users";
import * as Yup from 'yup';
import { AdminTitle } from "../../utilis/tools";
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    Button
} from '@mui/material'

const Contact = () => {
    const [loading, setLoading] = useState(null)
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notifications)
    const formik = useFormik({
        initialValues: { email: '', firstname: '', lastname: '', message: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('This is not a valid email'),
            firstname: Yup.string()
                .required('Sorry the First name is required'),
            lastname: Yup.string()
                .required('Sorry the Last name is required'),
            message: Yup.string()
                .required('Sorry the message is required')
                .max(500, 'sorry the message is too long')

        }),
        onSubmit: (values, {resetForm}) => {
            setLoading(true);
            console.log(values)
           dispatch(contactUs(values))
              setLoading(false);
        }
    })
    useEffect(()=>{
        if (notifications && notifications.global.success){
           formik.resetForm()
        
        }
     },[notifications])

     useEffect(() => {
        window.scrollTo(0,0);
     }, [])


    return (
        <>
            <AdminTitle title='Contact us' />
            {loading ?
                <Loader />
                :
                <>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name='email'
                                label='Enter your email address'
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name='firstname'
                                label='Enter your first name'
                                variant="outlined"
                                {...formik.getFieldProps('firstname')}
                                {...errorHelper(formik, 'firstname')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name='lastname'
                                label='Enter your last name'
                                variant="outlined"
                                {...formik.getFieldProps('lastname')}
                                {...errorHelper(formik, 'lastname')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name='message'
                                label='Enter your message'
                                variant="outlined"
                                multiline
                                rows ={4}
                                {...formik.getFieldProps('message')}
                                {...errorHelper(formik, 'message')}
                            />
                        </div>

                 
                    <Button variant="contained" color="primary" type="submit" className="mt-3">
                        Send your message
                    </Button>
                       </form>
                </>

            }
           
        </>
    )
}

export default Contact;