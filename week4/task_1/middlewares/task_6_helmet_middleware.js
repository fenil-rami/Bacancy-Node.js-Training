const helmet = require('helmet');

exports.helmetMiddleware = () => {
  helmet.contentSecurityPolicy({
    useDefaults: true,
  });
  return helmet.xXssProtection(); // to prevent xss attacks
};
