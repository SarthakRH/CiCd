const errorMiddleware = (error, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);

  res.json({
    message: error.message,
    status,
  });
};

module.exports = {errorMiddleware}
