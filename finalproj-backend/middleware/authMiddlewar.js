module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    /**
     * directly using a userId instead of a jwt
     * to simplify this process and focus on payment
     */
    req.userId = token;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
