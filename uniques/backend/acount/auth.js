const passport = require("passport");

const router = require("express").Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    error: false,
      res.status(200).json({
        message: "authenticated",
      });
  } else {
    res.status(403).json({ error: "true", message: "not authorized" });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: "true",
    message: "Log in faliur",
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});
module.exports = router;
