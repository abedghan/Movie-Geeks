import { LinkContainer } from 'react-router-bootstrap'
import ListItem from '@mui/material/ListItem';
import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl,

} from 'react-bootstrap';


const UserArticles = ()=> {

    return (
        <>
          <ListItem>
                                <ButtonToolbar className="mb-3">
                                    <ButtonGroup className="me-2">
                                        <LinkContainer to='/dashboard/articles/add'>
                                            <Button variant="secondary"> Add article</Button>
                                        </LinkContainer>
                                    </ButtonGroup>

                                </ButtonToolbar>
                            </ListItem>
        </>
    )
}
export default UserArticles 