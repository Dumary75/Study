import { useEffect, useState } from "react";
import Card from './components/Card.jsx';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTZmMzUwMWM0MmY4ODc1MGM0ZmJmYThkZDMzMmM4ZCIsIm5iZiI6MTczOTM4MTM5OS44MSwic3ViIjoiNjdhY2RhOTcxMTY4ZGVkYTEwOWYzMDc3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.4wUSyZdxq7cK1Pp7i3HMGKd1pJFcPSoHVM7NbCvv4NA'
  }
};

export default function App() {
  const[movieList,setList] = useState([])

 async function dataFetch() {
  try {
    let data = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
    let dataConvert = await data.json();
    setList(dataConvert.results);
  } catch (error) {
    console.log('FEHLER: ' + error);
  }}

  useEffect(() => {dataFetch()}, []);


  return (
      <>
      <div className="cardContainer">
        {
          movieList.map((movie,index) => (
              <Card key={index} img={"https://picsum.photos/200/300"} title={movie.title} text={movie.overview}/>
          ))
        }
      </div>
      </>
    )
};

