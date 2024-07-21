
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

Modal.setAppElement('#__next');

const MovieDetailModal = ({ imdbID, isOpen, onRequestClose, user }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultImage = '/imagen_no_disponible.png';

  useEffect(() => {
    const fetchMovie = async () => {
      if (imdbID) {
        try {
          const response = await axios.get(`https://www.omdbapi.com/?apikey=6e7c00f3&i=${imdbID}`);
          if (response.data.Response === 'True') {
            setMovie(response.data);
          } else {
            setError(response.data.Error);
          }
        } catch (error) {
          setError('Error fetching data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMovie();
  }, [imdbID]);

  
  const handleAddToFavorites= async () => {
    try {
      const token = localStorage.getItem('token');
 
      const response = await axios.post('/api/favorites',{ imdbID: movie.imdbID }, {
        headers: { Authorization: `bearer ${token}` }
      });
      console.log(response);
      
      //setIsFavorite(true);
    } catch (error) {
      console.error('Error al añadir favorito:', error);
    }
  };


  if (!isOpen) return null;




  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Movie Details"
      style={modalStyles}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : movie ? (
        
        
        <div style={styles.container}>
          
          <h2 className="text-2xl font-semibold mb-2 font-poppins">{movie.Title}</h2>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Director:</strong> {movie.Director}</p>


          <img src={movie.Poster !== 'N/A' ? movie.Poster : defaultImage}  alt={movie.Title}  
        className="w-full h-60 object-cover" />
            
          {user && (
            <button style={styles.addButton} onClick={handleAddToFavorites} >Favoritos</button>
            )}
          <br></br>
          <button onClick={onRequestClose} style={styles.closeButton}>Close</button>
        </div>
      ) : null}
    </Modal>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  poster: {
    marginTop: '20px',
    width: '300px',
    borderRadius: '8px',
  },
  addButton: {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    background: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    background: 'red',
    color: '#fff',
    cursor: 'pointer',
  },
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '100%',
    padding: '20px',
    borderRadius: '8px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export default MovieDetailModal;