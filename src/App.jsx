import { useEffect, useState } from "react";
import Card from './components/Card.jsx';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: '#'
  }
};

export default function App() {
  const[movieList,setList] = useState([])

 async function dataFetch() {
    let data = await fetch('https://api.themoviedb.org/3/discover/movie?inlude_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
    let dataConvert = await data.json();
    setList(dataConvert.results);
  }

  useEffect(() => {dataFetch()}, []);


  return (
      <>
      <div className="cardContainer">
        {
          movieList ? 
             movieList.map((movie,index) => (
            <Card key={index} img={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} title={movie.title} text={movie.overview}/>
        )) : <h3>Please Update the API_KEY in "Authorization"</h3>
        }
      </div>
      </>
    )
};

