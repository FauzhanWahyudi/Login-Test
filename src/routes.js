const { registerHandler, loginHanlder, getAllBooksHandler} = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHanlder
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
]

module.exports = routes
