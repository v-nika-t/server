const bcrypt = require('bcrypt');
const User = require('../modules/users.MongoDB');
const validateSchema = require('../validation-schemes/registration');


class UserService {
    getAllUsers = (req, res) => { 
        return User.find().then(data => data);
    };

   addUser =  (req, res) => { 
      try{
          validateSchema.validateAsync(req.body);
            return (
                bcrypt.hash(req.body.password, 10 )
                    .then(hash => { 
                        return ( 
                            new User({ name:req.body.name,mail:req.body.mail, password:hash })
                                .save() 
                                ) 
                        })
                    .then(data => data)
                    .catch(err => err) 
            )
          
        } catch (err) { return err }
    }
    
    editUser = (req, res) => { 
        try{
            validateSchema.validateAsync(req.body);
            return (
                bcrypt.hash(req.body.password, 10 )
                    .then(hash => { 
                        return  { 
                            'name':req.body.name, 
                            'mail':req.body.mail, 
                            'password':hash
                        }
                    })
                    .then(newData => User.findByIdAndUpdate(req.params.id, newData) )
                    .then( newData => newData )
            )

        } catch (err) { }
    }

    getUser = (req, res) => { 
        return User
            .findById(req.params.id)
            .then((data) => data);
    };

    getUserByEmail = (req, res) => {
        return User
            .findOne({mail: req.body.mail })
            .then((data) => data);
    };

    deleteUser = (req, res) => { 
        return User.findByIdAndDelete(req.params.id)
                   .then(() => req.params.id);
    }; 
}

module.exports =  new UserService;
