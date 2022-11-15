const { HTTP_INTERNAL_SERVER_ERROR } = require('../utils/httpStatus');

const errorHandling = (err, _req, res, _next) => {
  res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = errorHandling;