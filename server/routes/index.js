const express = require('express');
const router = express.Router();
//routes
const authRoute = require('./auth_route');
const userRoute = require('./user_route');
const articlesRoute = require('./articles_route');

const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/articles',
        route: articlesRoute
    }

]

routesIndex.forEach((route)=>{
router.use(route.path,route.route)
})


module.exports = router;