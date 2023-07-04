const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = isAuth = (req, res, next) => {
  //jwt stored in cookie
  //   if (!(req.cookies.token && jwt.verify(req.cookies.token, process.env.JWT_TOKEN)))
  //     return res.status(401).redirect("/login");

  //jwt stored in session
  if (
    !(req.session.token && jwt.verify(req.session.token, process.env.JWT_TOKEN))
  )
    return res.status(401).redirect("/login");

  //decoding jwt token which is stored in cookies
  //   req.user = jwt.decode(req.cookies.token);

  //decoding jwt token which is stored in session
  req.user = jwt.decode(req.session.token);
  req.user.isAuth = true;
  return next();
};
