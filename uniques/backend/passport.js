const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "642144642787-o3f9rfihr5l253qodubs21m08cdoaeo3.apps.googleusercontent.com",
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accesTocken, refereshTocken, profile, callback) {
      callback(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
