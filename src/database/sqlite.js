import path from 'path';
import sqlite3 from 'sqlite3';

const databasePath = path.join(path.resolve(), 'src', 'database', 'sqlite.db')

const sqlite = new sqlite3.Database(databasePath, err => {
	if (err) return console.error(err.message);
	console.log("Conexão bem-sucedida com o banco de dados 'sqlite.db'");
});

sqlite.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`);

sqlite.run(`
  CREATE TABLE IF NOT EXISTS my_user_messages (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    message VARCHAR(1048) NOT NULL,

    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

sqlite.get("SELECT id FROM users WHERE username LIKE 'admin'", [], (err, row) => {
  if (err) return console.error(err);
  
  if (!row) {
    sqlite.run(`INSERT INTO users (username, password) VALUES('admin', 'admin')`)
  }
});

export default sqlite;