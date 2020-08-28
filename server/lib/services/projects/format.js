const formatProject = project => {
  const {
    id,
    name,
    body,
    status,
    Author: {
      name: authorName,
      surname: authorSurname
    },
    tasks,
    users
  } = project

  return {
    id,
    name,
    body,
    status,
    authorName,
    authorSurname,
    tasks,
    users: users.map(user => user.get())
  }
}

module.exports = formatProject
