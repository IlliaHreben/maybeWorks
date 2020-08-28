module.exports = task => {
  const {
    id,
    name,
    description,
    mark,
    status,
    authorId,
    projectId,
    assigneeId
  } = task

  return {
    id,
    name,
    description,
    mark,
    status,
    authorId,
    projectId,
    assigneeId
  }
}
