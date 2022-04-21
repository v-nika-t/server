const {User} = require('../modules/users');
const { v4: uuidv4 } = require('uuid');
const validateSchema = require('../validation-schemes/registration');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./private.key',"utf-8");

class AuthService {
   addUser = (req, res) => { 
    try{
        validateSchema.validateAsync(req.body);
        return (
            bcrypt.hash(req.body.password, 10)
                  .then(hash => { return ( User.create (
                        {id:uuidv4(), name:req.body.name, mail:req.body.mail, password: hash}) 
                                         )
                    })
                    .then(async data => {
                        let token = await (jwt.sign({id: data.id, role: data.roleId}, privateKey) )
                        return await {data, token};
                    })
                    .then(data => data)
            );
                        
        } catch (err) { return err }
    };

    getUserByEmail = (req, res) => {
        return User
            .findAll({ where: { mail: req.body.mail }, raw: true })
            .then((data) => data);
    };

    validate = async (req, data) => {
        return (
            bcrypt.compare(req.body.password, data[0]['password'])
                  .then(result => {
                    if(result) {
                        data[0]['token'] =  jwt.sign({id: data.id, role: data.roleId}, privateKey) ;
                        return data;
                    }
                  })
        )   
    }

    verifyUser = (req, res) => {
        return ( jwt.verify(req.headers.authorization, privateKey, (err, payload) => {
                    if(!err) { return User.findAll({where:{id: payload.id}, raw: true})
                                          .then( data  => data)}
                  })  
                )
    }
}
module.exports =  new AuthService;
