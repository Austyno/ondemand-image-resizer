const router = require('express').Router()

const resizeRoutes = require('./resizeRoutes')

router.use('/resize', resizeRoutes)

module.exports = router

// https://your-imaginary-api.com/resize?width=200&height=300&image=image.png alt=”My Image” />