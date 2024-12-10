export const roles = {
  SUPERADMIN: 'SUPER_ADMIN',
  USER: 'USER',
};

export const status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTION',
};

export const errorCodes = {
  InternalServerError: 500,
  Unauthorized: 401,
  UnAvailableResource: 503,
  Forbidden: 403,
  BadRequest: 400,
  MethodNotAllowed: 405,
  NotFound: 400,
  RequestTimeout: 408,
  ContentTooLarge: 413,
  UnsupportedMediaType: 415,
  UnprocessableContent: 422,
  GatewayTimeout: 504,
};

export function errorHandler(err, toast, thunkAPI) {
  if (err.code === 'ERR_NETWORK') {
    toast.error(err.message);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.InternalServerError) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (
    err.code === 'ERR_BAD_REQUEST' ||
    err.response.data.status === errorCodes.Unauthorized
  ) {
    toast.error('Invalid credentials');
    return err.response.data;
  } else if (err.response.data.status === errorCodes.UnAvailableResource) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.Forbidden) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.BadRequest) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.MethodNotAllowed) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.NotFound) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.RequestTimeout) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.ContentTooLarge) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.UnsupportedMediaType) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.UnprocessableContent) {
    toast.error(err.response.data.error);
    return err.response.data;
  } else if (err.response.data.status === errorCodes.GatewayTimeout) {
    toast.error(err.response.data.error);
    return err.response.data;
  }

  return toast.error(thunkAPI.rejectWithValue('Oop! Something went wrong'));
}
