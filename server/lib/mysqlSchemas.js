const Sequelize = require('sequelize')

const sequelize = new Sequelize('maybeworks', 'maybeworks', 'maybeworks', {
  dialect: 'mysql',
  host: 'localhost',
  charset: 'utf8'
})

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Projects = sequelize.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

const Tasks = sequelize.define('task', {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mark: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Users.hasMany(Projects, {onDelete: 'cascade'})
Users.hasMany(Tasks, {onDelete: 'cascade'})

// Projects.hasOne(Users, {onDelete: 'cascade'})
// Tasks.hasOne(Users, {onDelete: 'cascade'})



sequelize.sync({force: true})
  .then(() => {
    console.log('Sucessfuly sync.')
  })
  .catch(err => console.log('ERROR!!! ' + err.message))


module.exports = { Users, Projects, Tasks }
