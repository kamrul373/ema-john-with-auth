import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
    const { logOut, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut().then(() => {
            navigate("/login");
        }).catch(error => console.log(error))
    }
    return (
        <header className='header-container'>
            <nav className='navbar'>
                <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
                <ul className='menu'>
                    <li><NavLink
                        className={({ isActive }) => isActive ? "active" : undefined}
                        to="/shop">Shop</NavLink>
                    </li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? "active" : undefined}
                        to="/orders">Orders</NavLink>
                    </li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? "active" : undefined}
                        to="/inventory">Inventory</NavLink>
                    </li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? "active" : undefined}
                        to="/about">About</NavLink>
                    </li>
                    <li><NavLink
                        className={({ isActive }) => isActive ? "active" : undefined}
                        to="/shipping">Shipping</NavLink>
                    </li>
                    {
                        user?.uid && <li> <Link>{user.email}</Link></li>
                    }
                    {
                        user?.uid ?
                            <li className='logout'>
                                <button onClick={handleLogout}>LogOut</button>
                            </li> : <>
                                <li><NavLink
                                    className={({ isActive }) => isActive ? "active" : undefined}
                                    to="/login">Login</NavLink>
                                </li>
                                <li><NavLink
                                    className={({ isActive }) => isActive ? "active" : undefined}
                                    to="/register">Register</NavLink>
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </header >
    );
};

export default Header;