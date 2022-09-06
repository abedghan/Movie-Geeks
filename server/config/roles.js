const AccessControl = require('accesscontrol');


const allRights = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*']
}

let grantsObject = {
    admin: {
        profile: allRights,
        articles: allRights,
        categories: allRights
    },
    user: {
        profile: {
            'read:own': ['*','!password','!_id'],
            'update:own': ['*','!password','!_id']
        },
        articles:{
            'read:any': ['*'],
            'create:any': ['*']
        },
        categories:{
            'read:any': ['*'],
            
        }
    }
}

const roles = new AccessControl(grantsObject);

module.exports = { roles }