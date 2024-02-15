/* eslint-disable func-names */
const internalServerError = function (res, err) {
  if (!res || !err) return;
  return res.status(500).json({
    message: 'Internal server error',
    error: err,
  });
};

const validBookIdError = function (res) {
  if (!res) return;
  return res.status(400).json({
    error: 'Please provide a valid book id',
  });
};

const validBookObjectError = function (res) {
  if (!res) return;
  return res.status(400).json({
    error: 'Please provide valid book details',
  });
};

module.exports = {
  internalServerError,
  validBookIdError,
  validBookObjectError,
};
