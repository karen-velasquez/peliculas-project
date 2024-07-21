// lib/db.js
import mysql from 'mysql2';
import { pool } from './dbPool'; // Asume que tienes una instancia de conexión a la DB


const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'peliculas'
});

export default connection.promise();// lib/db.js



export async function addFavorite(userId, imdbID) {
  const query = 'INSERT INTO favorites (user_id, imdbID, created_at) VALUES ($1, $2, NOW())';
  await pool.query(query, [userId, imdbID]);
}

export async function removeFavorite(userId, imdbID) {
  const query = 'DELETE FROM favorites WHERE user_id = $1 AND imdbID = $2';
  await pool.query(query, [userId, imdbID]);
}