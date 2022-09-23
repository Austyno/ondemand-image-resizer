const imageUtils = require('../utils/image.utils')
const fs = require('fs')

const resize = async (req, res, next) => {
  const { width, height, src, rotate } = req.query

  const image = await imageUtils.resizeImage(width, height, src,rotate)

  fs.readFile(image, (err, data) => {
    if (err) {
      console.error(err)
    }
    res.writeHead(200, { 'Content-Type': 'image/jpg' })
    res.end(data)
  })
}
module.exports = resize
