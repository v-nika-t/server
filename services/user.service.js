const db = require('../modules/users');

class UserService {
    
    getAllUsers = (req, res) => {
        return db.findAll({raw:true}).then(data => data);
    };

   addUser = (req, res) => {
        return (db
                    .create (
                        {name:req.body.name,mail:req.body.mail, password:req.body.password}
                        )
                    .then(data => data) );
    };

    editUser = (req, res) => {
        let newData =  { 
            'id': req.params.id,
            'name':req.body.name, 
            'mail':req.body.mail, 
            'password':req.body.password }
        
        return db
                .update({newData},{
                    where: { 
                        id: newData['id']
                    },
                }
                ).then(() => newData );
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
