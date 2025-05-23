const { AppError } = require('../utils/errorHandler');

const notFound = (req, res, next) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

module.exports = notFound; 