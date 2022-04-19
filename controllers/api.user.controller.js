const service= require('../services/user.service');
const bcrypt = require('bcrypt');

class UsersController {
    db = service;
    
    getAllUsers = (req, res) => {
      this.db.getAllUsers().then((data) => res.status(200).json(data));
    };

    addUser = (req, res) => {
        let a = bcrypt.hash(req.body.password, 10 , (err,hash) => {
            req.body.password = hash;
            this.db.addUser(req, res).then((data) => res.status(200).json(data));
        })
    };

    editUser = (req, res) => {
        bcrypt.hash(req.body.password, 10 , (err,hash) => {
            req.body.password = hash;
            this.db.editUser(req, res).then((data) => res.status(200).json(data));
        })
    };

    getEditUser = (req, res) => {
        this.db.getUser(req, res).then((data) => res.status(200).json(data));
    };

    deleteUser = (req, res) => {
        this.db.deleteUser(req, res).then((data) => res.status(200).json(data));
    };
}

 module.exports = new UsersController;