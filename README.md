# feature
Stream an image from a url to your browser and flip it along the Y and X axis.

## preview
![preview image](https://github.com/Flora2020/images/blob/main/image_processing.png?raw=true)

## execution
1. Download
    - index.html
    - main.js
    - style.css

    and put them in the same folder.

2. Open index.html in browser.
3. Enter a image url.
4. Click the 'flip the image' button.

# modules
- axios
- jimp
- browserify
- puppeteer (for automated tests)

# test
1. Download this project
`git clone https://github.com/Flora2020/image_processing.git`
2. Enter the project folder
`cd image_processing.git`
3. Install packages
`npm install --only=dev`
`npm install --only=prod`
4. test execution
`npm run test`