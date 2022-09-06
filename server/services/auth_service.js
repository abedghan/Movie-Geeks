const { User } = require('../models/user');
const userService = require('./user_service');
const { ApiError } = require('../middleware/api_error');
const httpStatus =require('http-status');


const createUser = async (email, password) => {

    try {
        //check if user already exists
        if (await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry email already exists');
        }

        //add user to the database(hash password)
        const user = new User({
            email,
            password
        });
        await user.save();
        return user;
    } catch (error) {
        throw error
    }
}
/// generate token
const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}
/// signin

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const user = await userService.findUserByEmail(email)
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry, no user with this email');
           
        }
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry, wrong password ');
            
        }
        return user;
    } catch (error) {
        throw error
    }
}
module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword
}