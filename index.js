// TODO: use browserify to require('modules') in the browser

const Jimp = require('jimp')
const axios = require('axios')

const flipButton = document.querySelector('#flipButton')

function flipImg (event) {
  const input = document.querySelector('#imageUrl')
  const imgUrl = input.value
  let mimeType = ''

  axios
    .get(imgUrl, { responseType: 'arraybuffer' })
    .then(response => {
      // get image ArrayBuffer
      mimeType = response.headers['content-type']
      return Jimp.read(response.data)
    })
    .then(image => {
      // flip image along the Y and X axis
      const horizontal = true
      const vertical = true
      image.flip(horizontal, vertical)
      return image.getBufferAsync(mimeType)
    })
    .then(image => {
      // show image
      const imgBox = document.querySelector('#ImgBox')
      const buffer = new Blob([image])
      imgBox.src = URL.createObjectURL(buffer)
    })
    .catch(error => console.log(error))
}

flipButton.addEventListener('click', flipImg)