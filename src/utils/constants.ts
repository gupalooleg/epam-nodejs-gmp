export const Message = {
  ProductNotFound: 'No product with such id',
  UserNotFound: 'No user with such id',
  CartNotFound: 'Cart was not found',
  CartNotUpdated: 'Cart was not updated',
  CartEmpty: 'Cart is empty',
  ProductsNotValid: 'Products are not valid',
  UserNotAuthorized: 'User is not authorized',
  UserMustBeAuthorized: 'You must be authorized user',
} as const;

export const HttpStatusCode = {
  Ok: 200,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  InternalServerError: 500,
} as const;
