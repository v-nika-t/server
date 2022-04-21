const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./private.key',"utf-8");

const service= require('../services/auth.service');


class AuthController {
  
    db = service;
    signUp = (req, res) => {
        this.db.addUser(req, res).then(({data, token}) => {
            res.header('Authorization', token);
            res.status(200).json(data)
        });
    };

    signIn = (req, res) => {
        this.db.getUserByEmail(req, res)
            .then((data) => { return (this.db.validate(req, data));
            }).then (data =>  res.status(200).json(data)) 
        .catch((err) => res.status(500).json(err));
        };

}

 module.exports = new AuthController;