export const Message = {
  ProductNotFound: 'No product with such id',
  UserNotFound: 'No user with such email or password',
  CartNotFound: 'Cart was not found',
  CartEmpty: 'Cart is empty',
  ProductsNotValid: 'Products are not valid',
  UserNotAuthorized: 'User is not authorized',
  ActionForbidden: 'Action forbidden',
  UserExists: 'User already exists',
  NoPermissionsForAction: 'Not enough permissions for this action',
} as const;

export const HttpStatusCode = {
  Ok: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  InternalServerError: 500,
} as const;
