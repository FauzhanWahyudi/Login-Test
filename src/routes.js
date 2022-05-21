const { registerHandler, loginHanlder} = require('./handler')

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
 
]

module.exports = routes
