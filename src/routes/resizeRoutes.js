const router = require('express').Router()
const resize = require('../controllers/resizeController')

router.route('/').get(resize)

module.exports = router
