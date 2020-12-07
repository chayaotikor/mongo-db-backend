const responseStatus = require("../config/responseStatuses");

function errorHandler(error, req, res, next) {
  switch (error) {
    case responseStatus.badRequest:
    res
    .json({statusCode: error,
        message: "Required fields cannot be blank."});
    case responseStatus.forbiddenAccess:
    res
    .json({statusCode: error,
        message: "You are not authorized."});
    case responseStatus.notFound:
    res
    .json({statusCode: error,
        message: "This resource does not exist."});
    case responseStatus.conflict:
    res
    .json({statusCode: error,
        message: "Resource already exists."});
    case responseStatus.serverError:
    res
    .json({statusCode: error,
        message: 
        "The request could not be completed. Please try again."
      });
    default:
    res
    .json({statusCode: error,
        message: error.message});
  }
  next()
}

module.exports = errorHandler;
