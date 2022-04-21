const path = require('path');
const controller = require(path.resolve(__dirname, "../controllers", "api.user.controller.js"));
const express = require('express');
const route = express.Router();

const upload = require('../middleware/multerProperties');
const arrayNames= upload.fields([{ name: 'test_1' }, { name: 'test_2' }, { name: 'test_3' } ]);

route
    .get("/api/users", controller.getAllUsers) 
    .get("/api/user/:id", controller.getEditUser)
    .post('/api/add-user', controller.addUser) 
    .put("/api/edit/:id", controller.editUser)
    .delete("/api/delete-user/:id", controller.deleteUser) 
    .post('/api/postFile', arrayNames, controller.form);
    
module.exports = route; 
