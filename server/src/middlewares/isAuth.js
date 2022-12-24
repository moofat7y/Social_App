const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const headerToken = req.get("Authorization")?.replace(/"/g, "");

  if (!headerToken) {
    const error = new Error("You are not authonticated");
    error.statusCode = 401;
    error.data = "You are not authonticated";
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(headerToken, process.env.TOKEN_KEY);
  } catch (err) {
    err.statusCode = 500;
    err.data = "invalid Token";
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("You are not logged in");
    error.statusCode = 401;
    error.data = "You are not logged in";
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
