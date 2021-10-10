import { Router } from 'express';

import users from '../repositories/users.js';
import messages from '../repositories/messages.js';

const router = Router();

const handleError = (response, error) => response.status(500).json({ message: `Unexpected error: ${error.message}` });

router
  .get('/users', async (request, response) => {
    try {
      const savedUsers = await users.findAll();
      return response.json(savedUsers);
    } catch (error) {
      return handleError(response, error);
    }  
  })
  .post('/users', async (request, response) => {
    try {
      const { username, password } = request.body;
    
      const user = await users.findByUsername(username);
    
      if (user) return response.status(409).json({ message: `User already exists with username '${username}'!` });

      await users.insert({ username, password });
      const savedUser = await users.findByUsername(username);

      delete savedUser.password;

      return response.status(201).json({ 
        message: 'User successfully created!',
        user: savedUser 
      });
    } catch (error) {
      return handleError(response, error);
    }  
  })
  .post('/users/:userId/messages', async (request, response) => {
    try {
      const { userId } = request.params;
      const { message } = request.body;

      await messages.insert({ userId, message });

      return response.json({ message: 'Message succelfully send!' });
    } catch (error) {
      return handleError(response, error);
    } 
  })
  .get('/users/:userId/messages', async (request, response) => {
    try {
      const { userId } = request.params;

      const savedMessages = await messages.findMessagesByUserId(userId);

      return response.json(savedMessages);
    } catch (error) {
      return handleError(response, error);
    } 
  })
  .get('/users/:userId/messages/:messageId', async (request, response) => {
    try {
      const { userId, messageId } = request.params;

      const message = await messages.findMessageByUserIdAndMessageId({ userId, messageId });

      if (!message) return response.status(404).json({ message: 'Message not found!' })
       
      return response.send(message);
    } catch (error) {
      return handleError(response, error);
    } 
  })
  .delete('/users/:userId/messages/:messageId', async (request, response) => {
    try {
      const { userId, messageId } = request.params;

      await messages.deleteByUserIdAndMessageId({ userId, messageId });

      return response.status(204).send();
    } catch (error) {
      return handleError(response, error);
    } 
  });

export default router;