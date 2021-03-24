const root = require('./root')
const status = require('./status')
const authRoutes = require('./auth/index')
const userRoutes = require('./user/index')
const creditcardRoutes = require('./user/creditcards/index')

module.exports = [root, status , ...userRoutes , ...authRoutes, ...creditcardRoutes]


