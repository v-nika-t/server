const service = require('../services/auth.service');

const auth =  (req, res, next) =>{
  service.verify(req, res)
         .then(data => {
           if(data == 'User not found') {next()}
           else {res.status(200).json(data)}
          }) 
};

module.exports =  auth;
