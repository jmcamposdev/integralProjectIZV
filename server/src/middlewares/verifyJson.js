/** ---------------------------------------------------------------------------
 * This middleware is used to handle JSON syntax errors.
 * ---------------------------------------------------------------------------
 */

/**
 * Handle JSON syntax errors
 * @param {*} error The error object
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const handleJsonSyntaxError = (error, req, res, next) => {
  // If the error is a SyntaxError and the status is 400 and the error has a body property
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    res.status(400).json({ error: 'Invalid JSON syntax' })
  } else {
    next()
  }
}
