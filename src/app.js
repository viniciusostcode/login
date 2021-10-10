import path from 'path';
import cors from 'cors';
import express from 'express';

import './database/sqlite.js';

import authenticationMiddleware from './middlewares/authenticationMiddleware.js';

import loggedOutRouter from './routes/loggedOutRouter.js';
import loggedRouter from './routes/loggedRouter.js';

express()
  .use(cors())
  .use(express.static(path.join(path.resolve(), 'src', 'static', 'public')))
  .use(express.json())
  .use(loggedOutRouter)
  .use(authenticationMiddleware)
  .use(loggedRouter)
  .listen(process.env.PORT || 8080, () => console.log('Servidor rodando na porta 8080!'));
