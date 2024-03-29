import { auth } from '../firebase-config/config';

export const authMiddleware = (request, response, next) => {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.send({ message: 'No token provided' }).status(401);
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    response.send({ message: 'Invalid token' }).status(401);
  }

  const token = headerToken.split(' ')[1];
  auth
    .verifyIdToken(token)
    .then(() => next())
    .catch(() => response.send({ message: 'Could not authorize' }).status(403));
};
