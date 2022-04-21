const service = require('../services/auth.service');

const auth =  (req, res, next) =>{
  service.verifyUser(req, res)
         .then(data => {if(data) res.status(200).json(data)}) 
         .then(() => next());
};

module.exports =  auth;
