const mysql = require("mysql2");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("node-server", 'root' , "root", {
  host: 'localhost',
  dialect: 'mysql',
  port:3306,
  define: {
    timestamps: false
  }
});

const User = sequelize.define('user', { 
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    mail: {
        type: Sequelize.STRING,
        allowNull: false
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
   
})

module.exports = User;

