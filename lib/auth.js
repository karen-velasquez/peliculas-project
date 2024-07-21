import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}