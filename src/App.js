import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=c831554d";

function App() {
  const [movies,setMovies] = useState([]);
  const[searchTerm,setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search===undefined) {
      setMovies([]);
    }
    else{
      setMovies(data.Search);
    }
  };
  useEffect(() => {
    searchMovies("shrek");
  }, []);
  return (
    <>
      <div className="app">
        <h1 style={{cursor:"pointer"}}>XO Movie</h1>

        <div className="search">
          <input
            placeholder="search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
        </div>
        {
          movies.length>0
          ? (
            <div className="container">
              {
                movies.map((movie,index)=>(
                    <MovieCard key={index} movie = {movie}/>
                ))
              }
            </div>
          ) :
          (
            <div className="empty">
              <h2>No Movies found</h2>
            </div>
          )
        }
     
      </div>
    </>
  );
}

export default App;
