/**
 * Standardized API response helper.
 *
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {any} [data=null]
 * @param {object} [pagination=null]
 */
export const sendResponse = (res, statusCode = 200, message = 'Success', data = null, pagination = null) => {
  const payload = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data
  };

  if (pagination) {
    payload.pagination = pagination;
  }

  return res.status(statusCode).json(payload);
};

export default sendResponse;
