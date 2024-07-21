
import jwt from 'jsonwebtoken';
import db from '../../../lib/db';

const JWT_SECRET = 'your_jwt_secret'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

      if (rows.length > 0) {
        const user = rows[0];
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}