/* eslint-disable indent */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const source = path.resolve(__dirname, 'src/public/images/heros')
const destination = path.resolve(__dirname, 'src/public/images/heros')

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination)
}

fs.readdirSync(source)
    .forEach((image) => {
        sharp(`${source}/${image}`)
            .resize(800)
            .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
                .slice(0, -1)
                .join('.')}-large.jpg`))

        sharp(`${source}/${image}`)
            .resize(480)
            .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
                .slice(0, -1)
                .join('.')}-small.jpg`))
    })