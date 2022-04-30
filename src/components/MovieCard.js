import React from 'react'

const MovieCard = ({movie}) => {
  
  const IMAGE_PATH = "https://imdb-api.com/images/original/"

  console.log(movie)
 
  return (
    
    <div className={"movie-card"}>
        {movie.image ? <img className={"movie-cover"} src={`${movie.image}`} alt={`${movie.title}`}/>
        : null}
        <h5 className={"movie-title"}>{movie.title}</h5>
    </div>
  )
}

export default MovieCard