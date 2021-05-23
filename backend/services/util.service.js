const fs = require('fs')

function saveToysToFile(entities, file) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`data/${file}.json`, JSON.stringify(entities, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}

function makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

module.exports = {
    saveToysToFile,
    makeId
}