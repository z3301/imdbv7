import React from 'react'

const MovieCard = ({movie, selectMovie}) => {
  
  const IMAGE_PATH = "https://imdb-api.com/images/original/"
 
  return (
    <div className={"movie-card"} onClick={() => selectMovie(movie)}>
        {movie.image ? <img className={"movie-cover"} src={`${movie.image}`} alt={`${movie.title}`}/>
        : 
        <div className="movie-placeholder">No Image Available</div>}
        <h5 className={"movie-title"}>{movie.title}</h5>
    </div>
  )
}

export default MovieCard