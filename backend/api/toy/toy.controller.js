const toyService = require('./toy.service')

async function getToys(req, res) {
    try {
        const filterBy = { txt: req.query.txt, inStock: req.query.inStock }
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch {
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function getById(req, res) {
    const { toyId } = req.params
    try {
        const toy = await toyService.getById(toyId)
        res.send(toy)
    } catch (err) {
        res.status(500).send({ err: 'faild to load toy' })
    }
}

async function createToy(req, res) {
    const toyToSave = req.body
    try {
        const toy = await toyService.createToy(toyToSave)
        res.send(toy)
    } catch (err) {
        res.status(500).send({ err })
    }
}

async function updateToy(req, res) {
    const toyToSave = req.body
    try {
        const toy = await toyService.updateToy(toyToSave)
        res.send(toy)
    } catch (err) {
        res.status(500).send({ err })
    }
}

async function remove(req, res) {
    const { toyId } = req.params
    try {
        await toyService.remove(toyId)
        console.log('Deleted successfully');
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        res.status(500).send({ err })
    }
}


module.exports = {
    getToys,
    getById,
    createToy,
    updateToy,
    remove
}
