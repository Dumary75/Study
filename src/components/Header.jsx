import { Link, Outlet } from "react-router-dom";
import MainPart from "./MainPart";



export default function Header({ userList }) {

    return (
        <>
        <nav className="Navbar">
            <Link to={'/details'}>Mainpart</Link>
            <input type="search" />
        </nav>

        <Outlet />
        </>
    );
}