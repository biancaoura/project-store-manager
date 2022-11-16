const httpStatus = require('../utils/httpStatus');

const errorHandling = (err, _req, res, _next) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = errorHandling;