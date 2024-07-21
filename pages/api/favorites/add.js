import { verify } from 'jsonwebtoken';
import { connectToDatabase } from '../../../lib/db';

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1];

    console.log("EL TOKEN");
    console.log(token);
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = verify(token, secret);
      const { movie } = req.body;
      const connection = await connectToDatabase();

      const [result] = await connection.execute(
        'INSERT INTO favorites (user_id, movie_id, title, year, director, actors, poster) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [decoded.id, movie.imdbID, movie.Title, movie.Year, movie.Director, movie.Actors, movie.Poster]
      );

      connection.end();

      res.status(200).json({ message: 'Movie added to favorites' });
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}