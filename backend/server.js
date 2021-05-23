const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
const path = require('path')

const app = express()



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Config Express Application
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const toyRoutes = require('./api/toy/toy.route.js')
const authRoutes = require('./api/auth/auth.route.js')

app.use('/api/toy', toyRoutes)
app.use('/api/user', authRoutes)



// TODO CRUDL

// LIST

//==========USER PATHS===========



app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
app.listen(port,
    () => console.log('Server listening on port 3030')
)
