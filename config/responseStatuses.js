const responseStatus = {
  successful: 200,
  created: 201,
  badRequest: 400,
  badCredentials: 401,
  forbiddenAccess: 403,
  userNotFound: 404,
  noteNotFound: 404,
  conflict: 409,
  typeError: 422,
  serverError: 500,
};

module.exports = responseStatus;
