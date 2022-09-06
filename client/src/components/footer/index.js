import { Link as RouterLink } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';


const Footer = () => {


    return (
        <>
            <div className="footer  ">
                <div className="footer_container">
                    <div className="box">
                        <h3>Movie Geeks</h3>
                        <p className='footer_text'>
                            Follow  us on Social Media
                        </p>

                        <ul className='social'>
                            <li>
                                <a href="https://www.facebook.com/abed.ghandour.3/"
                                    target='blank' className="facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/abedghan"
                                    target='blank' className="github">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/abed-ghandour-951016103/"
                                    target='blank' className="linkedin">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='box'>
                        <h3> Our partners</h3>
                        <ul className="links">
                            
                            <li><a href="https://www.imdb.com/" target="blank">IMDB</a></li>
                            <li><a href="https://www.rottentomatoes.com/" target = "blank">ROTTEN TOMATOES</a></li>
                            <li><a href="https://www.commonsensemedia.org/" target= "blank">Common Sense Media</a></li>

                        </ul>
                    </div>
                    
                    <div className="box">
                        <h3>Contact US :</h3>
                        <div className="line">
                            <i className="fas fa-map-marker-alt fa-fw"></i>
                            <div className="info">Romania, Bucharest,Academy Street, Number 28-30</div>
                        </div>
                        <div className="line">
                            <i className="far fa-clock fa-fw"></i>
                            <div className="info">Business Hours: From 10:00 To 18:00</div>
                        </div>
                        <div className="line">
                            <i className="fas fa-phone-volume fa-fw"></i>
                            <div className="info">
                                <span>+40-123-456-789</span>
                                <span>+40-987-654-321</span>

                            </div>
                        </div>
                        <div className="line">
                            <ListItem
                                button
                                component={RouterLink}
                                to='/contact'

                            >
                                <ListItemIcon>
                                    <MailIcon color='primary' />
                                </ListItemIcon>
                                <ListItemText primary='send us  email' />
                            </ListItem>
                        </div>
                    </div>

                </div>
                <p className="copyright">All rights reserved. &copy; Abed Ghandour 2022</p>
            </div>


        </>

    )
}


export default Footer;
