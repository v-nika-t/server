const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node-server')
        .then(res => {console.log('Connected to DB')})
        .catch(err => {console.log(err)})

const Schema = mongoose.Schema;

 const userSchema = new Schema( { 
    name: {
        type: String,
        required:true
      },
    mail: {
        type: String,
        required:true
      },
    password: {
        type: String,
        required:true
    }
   
})

module.exports = mongoose.model('User', userSchema);

