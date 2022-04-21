const mysql = require("mysql2");
const { Sequelize } = require('sequelize');
const defaultValueRole = 'e6d1db2d-5fbb-4aeb-b7a7-cb90298173b1';

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
        type: Sequelize.STRING,
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


const Role = sequelize.define('role', { 
  id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
  name: {
      type: Sequelize.STRING,
      allowNull: false
    }
})

Role.hasMany(User, {
  foreignKey: {
  allowNull: false,
  defaultValue: defaultValueRole,
  } 
});

sequelize.sync({force:false}).then(()=>{ // Синхронизировали, то есть создали таблицу. false - гов. что табл. Не будет удалена если сеть. еtrue -удалит
  console.log("Tables have been created");

}).catch(err=>console.log(err)); 

module.exports = {User, Role};
