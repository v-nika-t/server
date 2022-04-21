const {User, Role} = require('../modules/users');
const { v4: uuidv4 } = require('uuid');
const validateSchema = require('../validation-schemes/registration');
const bcrypt = require('bcrypt');

class UserService {
    getAllUsers = (req, res) => {
        return User.findAll({raw:true}).then(data => data);
    }

   addUser = (req, res) => {

      try{
        validateSchema.validateAsync(req.body);
        return (
            bcrypt.hash(req.body.password, 10)
                  .then(hash => { return ( User.create (
                        {id:uuidv4(), name:req.body.name, mail:req.body.mail, password: hash}) 
                                         )
                    })
                    .then(data => data)           
            );
                        
        } catch (err) { return err }
    };

    editUser = (req, res) => {
        try{
            validateSchema.validateAsync(req.body);
            return (
                bcrypt.hash(req.body.password, 10 )
                    .then(hash => { 
                        return  ( { 
                            'id': req.params.id,
                            'name':req.body.name, 
                            'mail':req.body.mail, 
                            'password':hash
                        } )
                    })
                    .then(async newData => {
                        await User.update(newData, { where: {id: newData['id']} }).then(data => console.log(data));
                        return await newData;
                    })
                    .then(data => data)
            )
        } catch (err) { }
    }

    getUser = (req, res) => {
        return User
            .findAll({ where: { id: req.params.id }, raw: true })
            .then((data) => data);
    };

    deleteUser = (req, res) => {
        return User
            .destroy({
                where: { 
                    id: req.params.id
                } 
            }).then(() => req.params.id);
    }; 
}


module.exports =  new UserService;
