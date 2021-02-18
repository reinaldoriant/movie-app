import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import MovieList from './components/MovieList';


const App = () => {
  const [movies, setMovies] = useState([]);
  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=Naruto&apikey=263d22d8`;

    const response = await fetch(url);
    const responsJson = await response.json();
    setMovies(responsJson.Search)
    console.log(responsJson);
   
  };
  useEffect(()=>{
    getMovieRequest();
  },[]);

  return (<div className='container-fluid'>
    <div className="row">
      <MovieList movies={movies} />
    </div>
  </div>);
};

export default App;
