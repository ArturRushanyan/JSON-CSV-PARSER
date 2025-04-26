module.exports = {
  INTERNAL_SERVER_ERROR: "Internal server error",
  SUBSCRIPTION_LIMIT_REACHED:
    "You've reached your subscription's request limit. Please upgrade to continue using the API.",
  INVALID_HASH: "Invalid hash parameter",
  MISSING_PARAMETERS: "Missing required headers: hash or apiKey",
  NO_DATA: "No Data",
  INVALID_LOGIN_CREDENTIALS: "Invalid login credentials",
  TOKEN_IS_EXPIRED: "The token has expired",
  USER_CREATED: "User successfully created",
  MISSING_AUTH_HEADERS: "Missing or invalid Authorization header",
  USER_ALREADY_EXISTS: "User with this email already exists",
  PARAMETER_IS_REQUIRED: (parameter) => `${parameter} is required`,
  INVALID_PARAMETER: (parameter) => `Invalid parameter: ${parameter}`,
};
