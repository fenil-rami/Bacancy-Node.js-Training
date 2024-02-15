/* eslint-disable no-unused-vars */
const { internalServerError } = require('../handler/errors');

exports.globalErrorHandler = (err, req, res, next) => internalServerError(res, err);
