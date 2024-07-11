export const errorHandler = (err, req, res, next) => {
    // Set the status code, defaulting to 500 if none is provided and the response status code is 200
    const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  
    const errorResponse = {
      status: err.status || "Failed",
      message: err.message || "Something went wrong, please try again later",
      statusCode: statusCode,
    };
      // console.error('Error:', errorResponse);
      res.status(statusCode).json(errorResponse);
  };
  