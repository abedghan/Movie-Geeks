import { AdminTitle } from "../../../utilis/tools";
import { useEffect, useState ,useReducer, useRef} from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import PaginateComponent from "./paginate";

import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl,
    
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { getPaginateArticles, changeStatusArticle,removeArticle } from '../../../store/actions/articles'


const AdminArticles = () => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [removeAlert, setRemoveAlert] = useState(false)
    const [toRemove, setToRemove] = useState(null)
    
    const handleClose = () => {
        setRemoveAlert(false)
    }
    const handleDelete = () => {
        dispatch(removeArticle(toRemove))
        .unwrap()
        .finally(() =>{
            setRemoveAlert(false)
            setToRemove(null)
        })
    }
    const handleShow = (id=null) => {
        setToRemove(id)
        setRemoveAlert(true)
    }

    ///Pagination commands
    const goToPrevPage = (page) => {
        dispatch(getPaginateArticles( {page}))
    };
    const goToNextPage = (page) => {
        dispatch(getPaginateArticles({ page} ))
    };
    const goToEdit = (id) => {
        navigate(`/dashboard/articles/edit/${id}`)
    }

    const handleStatusChange = (status, _id) => {
        let newStatus = status === 'draft' ? 'public' : 'draft';
        dispatch(changeStatusArticle({ newStatus, _id }))
    }
    //

    useEffect(() => {
        dispatch(getPaginateArticles({}))
    }, [])

    return (
        <>
            <AdminTitle title=' Articles' />
            <div className="articles_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="me-2">
                        <LinkContainer to='/dashboard/articles/add'>
                            <Button variant="secondary"> Add article</Button>
                        </LinkContainer>
                    </ButtonGroup>

                </ButtonToolbar>
                <>
                    <PaginateComponent
                        articles={articles.adminArticles}
                        goToPrevPage={(page) => goToPrevPage(page)}
                        goToNextPage={(page) => goToNextPage(page)}
                        goToEdit={(id) => goToEdit(id)}
                        handleStatusChange={(status, id) => handleStatusChange(status, id)}
                        handleShow = {id => handleShow(id)}
                    />
                </>
                <Modal show={removeAlert} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title> Are you sure you ?</Modal.Title>
                    </Modal.Header>
                        <Modal.Body> The Article can't be recovered after delete</Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick ={handleClose}>
                            Cancel
                        </Button>
                        
                        <Button variant ='danger' onClick ={()=>handleDelete()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )


}


export default AdminArticles;
