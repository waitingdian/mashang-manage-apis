'use strict'

const controllers = {}
controllers.user = require('./user')
controllers.miniprogram = require('./miniprogram')
controllers.admin = require('./admin')

module.exports = controllers