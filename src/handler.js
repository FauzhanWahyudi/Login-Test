const { nanoid } = require('nanoid')
const users = require('./user')

const registerHandler = (request, h) => {
  const { name = String, email = String, password = String } = request.payload // req body

  const userId = nanoid(16)
  const insertedAt = new Date().toISOString()

  // Client tidak melampirkan properti namepada request body.
  if (name === '') {
    return h
      .response({
        status: 'fail',
        message: 'Plese fill name'
      }).code(400)
  }

  const newUser = {
    userId, name, email, password, insertedAt
  }

  users.push(newUser)
  const isSuccess = users.filter((a) => a.userId === userId).length > 0

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'User Created'
    }).code(201)
  }

  // Server gagal memasukkan buku karena alasan umum (generic error).
  return h
    .response({
      status: 'error',
      message: 'User gagal ditambahkan'
    }).code(500)
}


const loginHanlder = (request, h) => {
  const { email = String, password = String } = request.payload
  
  let searchUser = users

  //CARI NAME DALAM ARRAY
  if (email !== undefined) {
    searchUser = searchUser.filter((n) => n.email.includes(email))
    if (searchUser === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'email or password is false'
      })
      response.code(404)
      return response
    }
  }

  //CARI PASSWORD DALAM ARRAY
  if (password !== undefined) {
    searchUser = searchUser.filter((n) => n.password.includes(password))
    if (searchUser === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'name or password is false'
      })
      response.code(404)
      return response
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      loginResult: searchUser.map((users) => ({
        userId: users.userId,
        name: users.name,
      }))
    }
  }).code(200)
  return response
}

module.exports = { registerHandler, loginHanlder}
