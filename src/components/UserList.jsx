
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header.jsx';
import MainPart from './MainPart.jsx';
import UserDetail from './UserDetail.jsx';

const userList = [];



export default function UserList(){

    return (
        <>

    <BrowserRouter>
        <Routes>
            <Route  element={<Header />}>
                <Route path="/" index element={<MainPart />} />
                <Route path="/details/:name" element={<UserDetail />} />
            </Route>
        </Routes>
    </BrowserRouter>

        </>
    );
}