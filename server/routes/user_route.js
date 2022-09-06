const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')
// Middleware
const auth = require('../middleware/auth')
const {contactMail} = require('.././services/email_service')

router.route('/profile')
.get(auth('readOwn','profile'),userController.profile)
.patch(auth('updateOwn','profile'),userController.updateProfile)
router.patch('/email',auth('updateOwn','profile'),userController.updateUserEmail)
router.get('/verify',userController.verifyAccount)

router.route('/contact')
.post(async(req,res)=>{
    try{
         await contactMail(req.body)
        res.status(200).send('ok');
    } catch(error){
        res.status(400).json({message:"Sorry, try again later",error:error});
    }
})





module.exports = router;