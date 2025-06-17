import { useQuery } from '@tanstack/react-query';
import { fetchEvents, deleteEvent } from '../../util/http.js';
import { Link, Outlet, useParams } from 'react-router-dom';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Header from '../Header.jsx';





export default function EventDetails() {

   
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['TestKey'],
    queryFn: fetchEvents

  });

    let content;
  
    if (isPending) {
      content = <LoadingIndicator/>;
    }
  
    if (isError) {
      content = (
        <ErrorBlock title="An error occurred" message="Failed to fetch eventdetails" />
      );
    }
  
      if (data) {
      const { id } = useParams();
       const event = data.find((event) => event.id === id);

      content = (
    <article id="event-details">
        <header>
          <h1>{event.title}</h1>
          <nav>
            <button onClick={() => deleteEvent({id})}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${event.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location} </p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{event.date}</time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
    </article>
      );
    } 


  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <>{content}</> 
    </>
  );
}
