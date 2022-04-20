const path = require('path');
const controller = require(path.resolve(__dirname, "../controllers", "api.auth.controller.js"));
const express = require('express');
const route = express.Router();
const auth = require( "../middleware/auth");

const upload = require(path.resolve(__dirname,'../middleware/multerProperties'));
const arrayNames= upload.fields([{ name: 'test_1' }, { name: 'test_2' }]) ;

route
    .use(auth)
    .post("/api/signUp", controller.signUp) 
    .post("/api/signIn", controller.signIn)
    .put("/api/auth/edit/:id" , controller.editUser)
    .delete("/api/auth/delete-user/:id" , controller.deleteUser)
    .post('/api/postFile', arrayNames , controller.form);

module.exports = route; 