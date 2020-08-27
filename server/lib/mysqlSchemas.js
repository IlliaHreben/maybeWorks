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
  authorId: {
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
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  projectId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  assigneeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Projects.belongsToMany(Users, {through: 'usersProjects'})
Users.belongsToMany(Projects, {through: 'usersProjects'})

Tasks.belongsTo(Users, {
  onDelete: 'cascade',
  foreignKey: 'assigneeId'
})
Users.hasMany(Tasks, {onDelete: 'cascade', foreignKey: 'assigneeId'})


Projects.hasMany(Tasks, {onDelete: 'cascade'})
Tasks.belongsTo(Projects, {onDelete: 'cascade'})

Projects.belongsTo(Users, {
  onDelete: 'cascade',
  foreignKey: 'authorId'
})
Users.hasMany(Projects, {onDelete: 'cascade', foreignKey: 'authorId'})

Tasks.belongsTo(Users, {
  onDelete: 'cascade',
  foreignKey: 'authorId'
})
Users.hasMany(Tasks, {onDelete: 'cascade', foreignKey: 'authorId'})




sequelize.sync({force: true})
  .then(() => {
    console.log('Sucessfuly sync.')
  })
  .catch(err => console.log('ERROR!!! ' + err.message))


module.exports = { Users, Projects, Tasks }
