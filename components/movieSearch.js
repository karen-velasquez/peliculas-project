
import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './movieCard';

import styles from './movieSearch.module.css';

const MovieSearch = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=6e7c00f3&s=${searchTerm}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className = {styles.temaColor}>
    <div className={styles.bigContainer}>
    <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie"
         className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleSearch} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className={styles.container}>
      
                  {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} user={user}/>
                  ))}
              
      </div>
  </div>
</div>


  
  );
};



export default MovieSearch;