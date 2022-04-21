const path = require('path');
const controller = require(path.resolve(__dirname, "../controllers", "api.admin.controller.js"));
const express = require('express');
const route = express.Router();


route
    .post('/api/add-role', controller.addRole) 
   
module.exports = route; 
