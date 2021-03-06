const express = require('express')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/User')
require('./services/passport')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true
})

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json())

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server is up and running')
})