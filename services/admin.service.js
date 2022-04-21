const {User, Role} = require('../modules/users');
const { v4: uuidv4 } = require('uuid');
const validateSchema = require('../validation-schemes/registration');
const bcrypt = require('bcrypt');

class AdminService {

   add = (req, res) => { 
        return ( Role.create ({id:uuidv4(), name:req.body.name})  
                     .then(data => data)           
               );
    }
    
}

module.exports =  new AdminService;
