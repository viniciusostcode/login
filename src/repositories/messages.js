import sqlite from '../database/sqlite.js';

import users from './users.js';

function insert({ userId, message }) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await users.findById(userId);
      if (!user) throw new Error(`User not found for id '${userId}'`)

      sqlite.run(`INSERT INTO my_user_messages (user_id, message) VALUES(?, ?)`, [userId, message], err => {
        if (err) return reject(err);
        return resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

function findMessagesByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    sqlite.all(`SELECT id, message FROM my_user_messages WHERE user_id = ?`, [userId], (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
}

function findMessageByUserIdAndMessageId({ userId, messageId }) {
  return new Promise(async (resolve, reject) => {
    sqlite.get(`SELECT * FROM my_user_messages WHERE user_id = ? AND id = ?`, [userId, messageId], (err, row) => {
      if (err) return reject(err);
      return resolve(row);
    });
  });
}

function deleteByUserIdAndMessageId({ userId, messageId }) {
  return new Promise(async (resolve, reject) => {
    sqlite.get(`DELETE FROM my_user_messages WHERE user_id = ? AND id = ?`, [userId, messageId], (err) => {
      if (err) return reject(err);
      return resolve();
    });
  }); 
}

export default {
  insert,
  findMessagesByUserId,
  findMessageByUserIdAndMessageId,
  deleteByUserIdAndMessageId
}