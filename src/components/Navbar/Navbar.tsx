import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

function Navbar() {
    return (
        <nav className='navbar'>
            <NavLink
                to="/moons"
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

            <NavLink
                to="/missions"
                className={({ isActive }) =>
                    isActive ? "navbar-active" : ""
                }
            >
                Missions
            </NavLink>
        </nav>
    )
}

export default Navbar