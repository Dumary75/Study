import { Link, Outlet } from "react-router-dom";


export default function Header({ userList }) {

    return (
        <>
        <nav className="Navbar">
            <Link to={'/'}>Mainpart</Link>
        </nav>

        <Outlet />
        </>
    );
}