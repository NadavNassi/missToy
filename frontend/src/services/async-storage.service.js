
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 0) {
    var entities = JSON.parse(localStorage.getItem(entityType))
    if (!entities) {
        entities = _seedDB(entityType)
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    console.log('entityId', entityId);
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _seedDB(entityType) {
    const data = [
        {
            _id: 'JVrvB',
            name: 'Checkers',
            category: 'board games',
            price: 50,
            createdAt: Date.now(),
            inStock: true
        },
        {
            _id: 'c6UI8',
            name: 'Monopoly',
            category: 'board games',
            price: 120,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            inStock: true
        },
        {
            _id: 'j789U',
            name: 'Talking',
            category: 'dolls',
            price: 87,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            inStock: true
        },
        {
            _id: '1122E',
            name: 'Catan',
            category: 'board games',
            price: 175,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            inStock: true
        },
    ]
    _save(entityType, data)
    return data
}