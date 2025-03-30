import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu toggle

const Navbar = ({ setQuery }) => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-white text-2xl font-bold">
                    NoteApp
                </Link>

                {/* Search Bar (Hidden on small screens) */}
                <div className="hidden md:block">
                    <input
                        type="text"
                        placeholder="Search Note"
                        className="px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-700"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-4">
                    {!user ? (
                        <>
                            <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                                Login
                            </Link>
                            <Link to="/register" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-extrabold">{user.name}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
                    <input
                        type="text"
                        placeholder="Search Note"
                        className="px-3 py-2 rounded-md border border-black w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {!user ? (
                        <>
                            <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-3/4 text-center">
                                Login
                            </Link>
                            <Link to="/register" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition w-3/4 text-center">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-extrabold">{user.name}</span>
                            <button
                                onClick={logout}
                                className=" cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-3/4"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
