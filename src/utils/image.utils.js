const sharp = require('sharp')
const path = require('path')
const Axios = require('axios')
const fs = require('fs')

module.exports = {
  async resizeImage(width, height, src, rotate=0) {
    let file = 'image.jpg'
    return new Promise(async (resolve, reject) => {
      try {
        let transformerToUse

        if (height == undefined && width == undefined) {
          transformerToUse = sharp().rotate(parseInt(rotate))
        } else if (width == undefined) {
          transformerToUse = sharp()
            .rotate(parseInt(rotate))
            .resize({
              height: parseInt(height),
              fit: sharp.fit.cover,
            })
        } else if (height == undefined) {
          transformerToUse = sharp()
            .rotate(parseInt(rotate))
            .resize({
              width: parseInt(width),
              fit: sharp.fit.cover,
            })
        } else if (width != undefined && height != undefined) {
          transformerToUse = sharp()
            .rotate(parseInt(rotate))
            .resize({
              width: parseInt(width),
              height: parseInt(height),
              fit: sharp.fit.cover,
            })
        }

        const response = await Axios({
          url: src,
          method: 'GET',
          responseType: 'stream',
        })
        response.data
          .pipe(transformerToUse)
          .pipe(fs.createWriteStream(file))
          .on('error', error => {
            reject(error)
          })
          .once('close', () => resolve(file))
      } catch (e) {
        console.error(e)
      }
    })
  },
}
