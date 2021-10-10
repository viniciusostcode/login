import sqlite from '../database/sqlite.js';

function findAll() {
  return new Promise((resolve, reject) => {
    sqlite.all('SELECT id, username FROM users', [], (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
}

function findById(userId) {
  return new Promise((resolve, reject) => {
    sqlite.get('SELECT id, username, password FROM users WHERE id = ?', [userId], (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
}

function findByUsername(username) {
  return new Promise((resolve, reject) => {
    sqlite.get('SELECT id, username, password FROM users WHERE username LIKE ?', [username], (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
}

function insert({ username, password }) {
  return new Promise((resolve, reject) => {
    sqlite.run(`INSERT INTO users (username, password) VALUES(?, ?)`, [username, password], (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export default {
  findAll,
  findById,
  findByUsername,
  insert
}