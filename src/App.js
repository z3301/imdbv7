import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard'
import YouTube from 'react-youtube'

function App() { 

  const API_URL = 'https://imdb-api.com/en/API'
  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY

  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})
  const [searchKey, setSearchKey] = useState('')

  const fetchMovies = async () => {
    const {data: {items}} = await axios.get(`${API_URL}/InTheaters/${API_KEY}`)

    setSelectedMovie(items[0])
    setMovies(items)
  }

  const searchMovies = async (searchKey) => {
    const {data: {results}} = await axios.get(`${API_URL}/Search/${API_KEY}/${searchKey}`)

    setMovies(results)
  }
  
  useEffect( () => {
    fetchMovies()
  }, [])

  const renderMovies = () => (

    movies.map(movie => (
      <MovieCard
        key={movie.id} 
        movie={movie}
        selectMovie={setSelectedMovie}
      />
    ))
  )

  const searchFunction = (e) => {
    e.preventDefault()
    searchMovies(searchKey)
  }

  return (
    <div className="App">
      <header className="header">
        <div className="header-content max-center">
          <span>MovieDB</span>
          <form onSubmit={searchFunction}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      
      <div className="hero" style={{ backgroundImage: `url('${selectedMovie.image}')`}}>
        {console.log(selectedMovie)}
        <div className="hero-content max-center">
          <YouTube 
          />
          <button className="button">Play Trailer</button>
          <h1 className="hero-title">{selectedMovie.title}</h1>
          {selectedMovie.plot ? <p className="hero-plot">{selectedMovie.plot}</p> : null} 
        </div>
      </div>

      <div className="container max-center">  
        {renderMovies()}
      </div>

    </div>
  );
}

export default App;
