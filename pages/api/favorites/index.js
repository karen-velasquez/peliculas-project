import { verifyToken } from '../../../lib/auth'; // Función para verificar JWT
import { addFavorite } from '../../../lib/db'; // Función para interactuar con la DB

export default async function handler(req, res) {
    console.log(req);
  const { method } = req;
  
  if (method === 'POST') {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = await verifyToken(token);
      
      const { imdbID } = req.body;
      await addFavorite(user.user_id, imdbID);
      
      res.status(200).json({ message: 'Película añadida a favoritos' });
    } catch (error) {
      
      res.status(401).json({ message: 'No autorizado' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${method} no permitido`);
  }
}