const service = require('../services/auth.service');

const auth =  (req, res, next) =>{
  service.verify(req, res)
         .then(data => {
           res.status(200).json(data)
           next()
          }) 
};

module.exports =  auth;
