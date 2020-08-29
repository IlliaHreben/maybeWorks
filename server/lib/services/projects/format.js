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

  return {
    id,
    name,
    body,
    status,
    author,
    tasks,
    users
  }
}

module.exports = formatProject
