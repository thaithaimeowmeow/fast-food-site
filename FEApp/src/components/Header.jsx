// src/components/Header.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const Header = () => {

  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()
  const signOut = useSignOut()

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    signOut();
    window.location.reload();
  };



  return (
    <div>
      {/* Navbar */}
      <nav className="bg-black p-4">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <Link to="/" className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">Fast food shop </Link>

          {/* Hamburger menu for small screens */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div className={`lg:flex flex-col lg:flex-row ${isOpen ? 'block' : 'hidden'} lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}>

            <Link to="/" className="text-white  px-4 py-2 hover:text-orange-600 ">Menu</Link>
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="text-white px-4 py-2 hover:text-orange-600"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg></Link>

                <div className="text-white  px-4 py-2 hover:text-orange-600 ">{auth.username}</div>
                <button onClick={handleLogout} className="text-white  px-4 py-2  hover:text-orange-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="text-white  px-4 py-2  hover:text-orange-600">Login/Register</Link>
            )}

          </div>
        </div>

      </nav>


    </div>
  );
};

export default Header;
