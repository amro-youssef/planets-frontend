import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className='navbar'>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "navbar-active" : ""
                }
            >
                Moons
            </NavLink>

            <NavLink
                to="/planets"
                className={({ isActive }) =>
                    isActive ? "navbar-active" : ""
                }
            >
                Planets
            </NavLink>

            {/* <NavLink
                to="/missions"
                className={({ isActive }) =>
                    isActive ? "navbar-active" : ""
                }
            >
                Missions
            </NavLink> */}
        </nav>
    )
}

export default Navbar