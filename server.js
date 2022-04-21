const PORT = 3000;

const methodOverride = require('method-override');
const express = require('express');
const app = express();

const userApiRotes = require('./routs/api.user.rout.js');
const authApiRoutes = require('./routs/api.auth.rout.js');
const adminApiRotes = require('./routs/api.admin.rout.js');


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use('/auth', authApiRoutes);
app.use('/user', userApiRotes);
app.use('/admin', adminApiRotes);


app.listen(PORT, (err) => {
    if(err) { console.log(err) } 
})









