const jwt = require("jsonwebtoken");
const secret = "todo";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "access denied" });
  }
  try {
    const data = jwt.verify(token, secret);
    req.user = data.id;
    next();
  } catch (error) {
    return res.status(400).json({ msg: "invalid token" });
  }
};

module.exports = fetchuser;
