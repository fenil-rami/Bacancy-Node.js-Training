/* eslint-disable no-prototype-builtins */
/* eslint-disable func-names */
// using middleware to check the admin condition for every API
const accessRestrictedError = function (res) {
  if (!res) return;
  return res.status(403).json({
    error: 'Access denied',
  });
};

exports.adminMiddleware = function (req, res, next) {
  if (req.method === 'GET') next();
  else if (req.headers.hasOwnProperty('role') && req.headers.role === 'admin') next();
  else return accessRestrictedError(res);
};
