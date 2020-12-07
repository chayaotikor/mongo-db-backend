const responseStatus = require("../config/responseStatuses");

function errorHandler(error) {
  switch (error) {
    case responseStatus.badRequest:
      throw Error("Required fields cannot be blank.");
    case responseStatus.forbiddenAccess:
      throw Error("You are not authorized.");
    case responseStatus.notFound:
      throw Error("This resource does not exist.");
    case responseStatus.conflict:
      throw Error("User already exists.");
    case responseStatus.serverError:
      throw Error(
        "The request could not be completed. Please try again."
      );
    default:
      throw Error(error.message);
  }
}

module.exports = errorHandler;
