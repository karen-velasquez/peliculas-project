
import React, { useEffect, useState } from 'react';
import MovieSearch from '../components/movieSearch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logout } from '../utils/auth';

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setUser({ token }); 
    }
    console.log(user);
  }, []);

  
  return (
    <div style={styles.container}>
      
      <div className="absolute top-4 right-4">
      {user && (
        <button onClick={logout} style={styles.button}>
        Cerrar Sesión
      </button>
      )}
      <Link href="/login" passHref>
        {!user && (
        <button style={styles.button}>Iniciar Sesión</button>
      )}
      </Link>
      </div>

      <MovieSearch user={user}  />
      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    textDecoration: 'none', // Elimina el subrayado por defecto de los enlaces
  },
};

export default Home;