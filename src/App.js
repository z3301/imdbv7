import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard'

function App() { 

  const API_URL = 'https://imdb-api.com/en/API'
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY

  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState('')

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? 'Search' : 'MostPopularMovies'
    const query = searchKey ? searchKey : ''
    const {data: {items}} = await axios.get(`${API_URL}/${type}/${API_KEY}/${query}`)

    setMovies(items)
    console.log(items)
  }

  useEffect( () => {
    fetchMovies()
  }, [])

  const renderMovies = () => (

    movies.map(movie => (
      <MovieCard
        key={movie.id} 
        movie={movie}
      />
    ))
  )

      const searchMovies = (e) => {
        e.preventDefault()
        fetchMovies(searchKey)
      }

  return (
    <div className="App">
      
      <header>
        <h1>MovieDB</h1>
        <form onSubmit={searchMovies}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </header>
      {searchKey}
      <div className="container">  
        {renderMovies()}
      </div>

    </div>
  );
}

export default App;
