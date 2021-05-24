const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectID
const logger = require('../../services/logger.service')



async function query(filterBy) {
    //Sorting
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toyDB')
        let toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('Failed to get toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toyDB')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error('Failed to get toy', err)
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
        logger.error('Failed to create toy', err)
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
        logger.error('Failed to update toy', err)
        throw err
    }
}


async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toyDB')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error('Failed to remove toy', err)
        throw err
    }
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