const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node-server')
        .then(res => {console.log('Connected to DB')})
        .catch(err => {console.log(err)})
