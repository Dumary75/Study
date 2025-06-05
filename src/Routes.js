import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import NewEventPage from './NewEventPage';
import RootLayout from './RootLayout';
import EventDetailPage from './EventDetailPage';


export default function Pathes(){


    return(
        <>
            <Routes>
                <Route path='/' element={< RootLayout />} >
                    <Route path="Homepage" index element={<Homepage />} />
                    <Route path='NewEvent' element={<NewEventPage />}/>
                     <Route path=":eventName" element={<EventDetailPage />} />
                </Route>
            </Routes>
        </>
    );
}