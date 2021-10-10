import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chave-secreta';

export default function (request, response, next) {
  const token = request.headers['x-access-token'];

  if (!token) {
    return response.status(401).json({ message: 'Token must be provided!' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch(error) {
    return response.status(401).json({ message: 'Invalid token!' });
  }

  next();
}