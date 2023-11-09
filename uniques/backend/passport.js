const passport = require("passport");

const Googles=require('passport-google-oauth20').Strategy
passport.use(
    new Googles(
        { 
            clientID: process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:"auth/google/callbac",
            scope:["profile","email"],
            
        },
        function (accesTocken,refereshTocken,profile,callback) {
            callback(null,profile);
            
        }
    )
)
passport.serializeUser((user,done)=>{
    done(null,user)

})
passport.deserializeUser((user, done)=>{
done(null,user)
})