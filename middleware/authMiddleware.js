function isuAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You need to be logged in to to access this page.");
    res.redirect("/signup");
  }
}

function communityAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/communityLogin");
  }
}

module.exports = { isuAuthenticated, communityAuthenticated };
