/**
 * Wraps async route handlers to catch exceptions and pass them to Express error middleware.
 *
 * @param {Function} fn
 * @returns {Function}
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
