const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectID



async function query(filterBy) {
    //Sorting
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toyDB')
        let toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toyDB')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        throw err
    }
}

async function createToy(toy) {
    try {
        const collection = await dbService.getCollection('toyDB')
        toy.img = `https://robohash.org/${toy.name}`
        toy.inStock = true
        toy.createdAt = toy.updatedAt = Date.now()
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        throw err
    }
}

async function updateToy(toy) {
    const { _id } = toy
    toy.updatedAt = Date.now()
    try {
        const collection = await dbService.getCollection('toyDB')
        await collection.updateOne({ '_id': ObjectId(_id) }, { $set: { ...toy, _id: ObjectId(_id) } })
        return toy;
    } catch (err) {
        throw err
    }
}


async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toyDB')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        throw err
    }
    //     const idx = gToys.findIndex(currToy => currToy._id === toyId)
    //     if (idx === -1) return Promise.reject('No such Toy')
    //     gToys.splice(idx, 1)
    //     return utilService.saveToysToFile(gToys, 'toy')
}


module.exports = {
    query,
    createToy,
    getById,
    remove,
    updateToy
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        criteria.name = { $regex: filterBy.txt, $options: 'i' }
    }
    if (filterBy.inStock !== 'all') {
        criteria.inStock = { $exists: JSON.parse(filterBy.inStock) }
    }
    return criteria
}