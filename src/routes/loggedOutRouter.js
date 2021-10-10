import path from 'path';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import users from '../repositories/users.js';

const router = Router();

const JWT_SECRET = 'chave-secreta';

router
  .get('/', (request, response) => {
    return response.sendFile(path.join(path.resolve(), 'src', 'static', 'login.html'));
  })
  .get('/home', (request, response) => {
    return response.sendFile(path.join(path.resolve(), 'src', 'static', 'index.html'));
  })
  .post('/login', async (request, response) => {
    const { username, password } = request.body;

    const user = await users.findByUsername(username);

    if (!user) {
      return response.status(401).json({ message: 'Invalid username or password.'});
    }

    const isValidPassword = String(password) === String(user.password);

    if (!isValidPassword) {
      return response.status(401).json({ message: 'Invalid username or password.'});
    }

    const accessToken = jwt.sign(
      { sub: username },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    return response.json({ accessToken });
  })

export default router;