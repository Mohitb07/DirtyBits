const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('users')
const keys = require('../config/keys')

passport.serializeUser((user, done)=> {
    done(null, user.id)
})

passport.deserializeUser((id, done)=> {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL : '/auth/google/callback',
    proxy:true
}, async (accessToken, refreshToken, profile, done) => {
        // console.log(profile)
        const existingUser = await User.findOne({ googleId: profile.id });
        if(existingUser) {
            return done(null, existingUser)
        }
        const user = await new User({
            username: profile.displayName,
            googleId:profile.id, 
            avatar : profile.photos[0].value,
            email : profile.emails[0].value           
        }).save()
        done(null, user)
        
    }
    )  
)