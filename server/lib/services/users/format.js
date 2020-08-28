module.exports = user => {
  const {id, name, surname, email} = user

  return {
    id,
    name,
    surname,
    email
  }
}
