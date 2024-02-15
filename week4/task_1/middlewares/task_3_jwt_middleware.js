/* eslint-disable func-names */
const JWT_SECRET = '9ff6125c982248baa6bd21162929b7c0';
const jwt = require('jsonwebtoken');

const accessRestrictedError = function (res) {
  if (!res) return;
  return res.json({
    message: 'Access Denied! Unauthorized User',
  });
};

exports.jwtMiddleware = (req, res, next) => {
  const excludedPaths = ['/api/v1/auth/signup', '/api/v1/auth/login'];

  // skip the token verification for auth apis
  if (excludedPaths.includes(req.path)) {
    next();
    return;
  }

  let token = req.get('authorization');
  if (token) {
    token = token.slice(7);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return accessRestrictedError(res);
      req.decoded = decoded;
      next();
    });
  } else return accessRestrictedError(res);
};
