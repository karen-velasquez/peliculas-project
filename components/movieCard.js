
import React, { useState } from 'react';
import MovieDetailModal from './MovieDetailModal';
import Image from 'next/image';

const MovieCard = ({ movie, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultImage = '/imagen_no_disponible.png';

  const handleClick = () => {
    setIsModalOpen(true);
  };


  

  console.log(user);

  return (
    
    <>
      <div style={styles.card} onClick={handleClick}  className="max-w-sm rounded overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105">
        
         <div className="p-4">
         <img src={movie.Poster !== 'N/A' ? movie.Poster : defaultImage}  alt={movie.Title}  
        className="w-full h-20 object-cover" />
          <h2 className="text-2xl font-semibold mb-2 font-poppins">{movie.Title}</h2>
          <p className="text-gray-600 mb-2 font-poppins">{movie.Year}</p>
      
        </div>
      </div>
      <MovieDetailModal
        imdbID={movie.imdbID}
        isOpen={isModalOpen}
        user={user}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px',
    width: '200px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    
  },
  poster: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  details: {
    marginTop: '8px',
    textAlign: 'center',
  },
};

export default MovieCard;