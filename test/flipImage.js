const path = require('path')
const fs = require('fs')
const assert = require('assert')
const puppeteer = require('puppeteer')
const Jimp = require('jimp')

const htmlFilePath = path.join(__dirname, '../index.html');

(async () => {
  /********
  * 在 chrome 上開啟本地的 index.html 檔案，模擬使用者輸入網址後按下按鈕的操錯。
  * 本地上圖片的翻轉結果，和 chrome 中圖片的翻轉結果應該要相同
  *********/
  const browser = await puppeteer.launch({
    // headless: false,  // 若需要觀察此測試在 chrome 上的操作過程，可以把此兩行註解打開再執行測試
    // slowMo: 250, // slow down by 250ms
  })
  const page = await browser.newPage()
  await page.goto('file://' + htmlFilePath)

  await page.evaluate(() => {
    const imageUrlInput = document.querySelector('#imageUrl')
    // 選資料量小一點的圖片，讓測試可以早一點跑完
    imageUrlInput.value = 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png'
  })
  await page.click('#flipButton')

  // 利用等待 chrome 翻轉圖片的空擋，在本地也翻轉同一張圖片
  let imageData = await Jimp.read('https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png')
  const horizontal = true
  const vertical = true
  imageData = await imageData.flip(horizontal, vertical)
  const expectedDataURI = await imageData.getBase64Async('image/png')
  await page.waitForTimeout(1000) // 需要再多等一下，chrome 才能完成圖片翻轉

  const resultDataURI = await page.$eval('#ImgBox', img => img.src)
  assert(resultDataURI === expectedDataURI)
  console.log('pass! image flipped.')

  await browser.close()
})()
