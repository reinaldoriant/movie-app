import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourites from '../components/AddFavourites';
import RemoveFavourites from '../components/RemoveFavourites';



const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responsJson = await response.json();
    if (responsJson.Search) {
      setMovies(responsJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  }
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList)
  }
  return (
  
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Movies App' />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
    <div className='row'>
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouritesComponent={AddFavourites}
      />
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favourites' />
    </div>
    <div className='row'>
      <MovieList
        movies={favourites}
        handleFavouritesClick={removeFavouriteMovie}
        favouritesComponent={RemoveFavourites} />
    </div>
  </div>
  );
};

export default Home;

