const userMiddleware = (req, res, next) => {
    const userCookie = req.cookies.user;
    if (userCookie) {
      req.currentUser = JSON.parse(userCookie);
    } else {
      req.currentUser = {};
    }
    next();
  };
  
  const ensureAuthenticated = (req, res, next) => {
    if (!req.currentUser || Object.keys(req.currentUser).length === 0) {
      return res.redirect("/login");
    }
    next();
  };
  
  const redirectIfAuthenticated = (req, res, next) => {
    if (req.currentUser && Object.keys(req.currentUser).length !== 0) {
      return res.redirect("/");
    }
    next();
  };
  

module.exports = {
  userMiddleware,
  ensureAuthenticated,
  redirectIfAuthenticated,
};
