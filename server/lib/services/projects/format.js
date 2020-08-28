const formatProject = project => {
  const {
    id,
    name,
    body,
    status,
    Author: author,
    tasks,
    users
  } = project

  const authorInfo = {}
  if (author && author.id) {
    authorInfo.id = author.id
  }
  if (author && author.name) {
    authorInfo.name = author.name
  }
  if (author && author.surname) {
    authorInfo.surname = author.surname
  }
  return {
    id,
    name,
    body,
    status,
    authorInfo,
    tasks,
    users: users ? users.map(user => user.get()) : []
  }
}

module.exports = formatProject
