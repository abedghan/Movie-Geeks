import { errorHelper } from "../../../utilis/tools";
import { addCategories } from "../../../store/actions/articles";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Divider
} from '@mui/material'
const AddCategory = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { name: '' },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('The name is required')
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addCategories(values))
            resetForm()
        }
    })
    return (

        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mt-5">
                    <TextField style={{ width: '100%' }}
                        name='name'
                        label='Enter a name'
                        variant="outlined"
                        {...formik.getFieldProps('name')}
                        {...errorHelper(formik, 'name')}
                    />
                </div>
                <Button
                className="mt-3"
                    variant="contained"
                    color="primary"
                    type="submit">
                        Add category
                </Button>
            </form>
        </>
    )

}

export default AddCategory;