const gToys = require('../data/toy.json')

const utilService = require('./util.service.js')

function query(filterBy) {
    //Sorting
    const filterRegx = new RegExp(filterBy.txt, 'i')
    let toys = gToys.filter(toy => filterRegx.test(toy.name))
    if (filterBy.inStock !== 'all') {
        toys = toys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
    }
    return Promise.resolve(toys)
}

function save(toy) {
    if (toy._id) {
        // UPDATE
        const idx = gToys.findIndex(currToy => currToy._id === toy._id)
        if (idx !== -1) {
            toy.updatedAt = Date.now()
            gToys[idx] = toy
        }
    } else {
        // CREATE
        toy._id = utilService.makeId()
        toy.img = `https://robohash.org/${toy.name}`
        toy.inStock = true
        toy.createdAt = toy.updatedAt = Date.now()
        gToys.unshift(toy)
    }
    return utilService.saveToysToFile(gToys, 'toy').then(() => {
        return toy
    })
}

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = gToys.findIndex(currToy => currToy._id === toyId)
    if (idx === -1) return Promise.reject('No such Toy')
    gToys.splice(idx, 1)
    return utilService.saveToysToFile(gToys, 'toy')
}


module.exports = {
    query,
    save,
    getById,
    remove
}