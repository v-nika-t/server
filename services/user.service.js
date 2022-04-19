const db = require('../modules/users');
const { v4: uuidv4 } = require('uuid');
const validateSchema = require('../validation-schemes/registration');

class UserService {
    getAllUsers = (req, res) => {
        return db.findAll({raw:true}).then(data => data);
    };

   addUser = (req, res) => {

      try{
          validateSchema.validateAsync(req.body);
            return (db
                        .create (
                            {id:uuidv4(),name:req.body.name,mail:req.body.mail, password:req.body.password}
                            )
                        .then(data => data) );
                        
        } catch (err) { return err }
    };

    editUser = (req, res) => {
        try{
            validateSchema.validateAsync(req.body);
            
            let newData =  { 
                'id': req.params.id,
                'name':req.body.name, 
                'mail':req.body.mail, 
                'password':req.body.password }
                console.log(newData);
                
            return (db
                    .update( newData,{
                        where: { 
                            id: newData['id']
                        }
                    }
                    ).then(() => newData ) );
        } catch (err) { }
    }

    getUser = (req, res) => {
        return db
            .findAll({ where: { id: req.params.id }, raw: true })
            .then((data) => data);
    };

    getUserByEmail = (req, res) => {
        return db
            .findAll({ where: { mail: req.body.mail }, raw: true })
            .then((data) => data);
    };

    deleteUser = (req, res) => {
        return db
            .destroy({
                where: { 
                    id: req.params.id
                } 
            }).then(() => req.params.id);
    }; 
}


module.exports =  new UserService;
