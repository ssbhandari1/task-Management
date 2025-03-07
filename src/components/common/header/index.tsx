

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaUserCircle, FaBell, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login')
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    router.push('/auth/login')
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex items-center justify-between py-3 px-4 bg-blue-900 text-white shadow-md">
      <h1 className="font-semibold text-xl">Task Management</h1>

      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaUserCircle size={24} className="cursor-pointer" />
          </div>

          <FaBell size={24} className="cursor-pointer" />

          <FaSignOutAlt
            size={24}
            className="cursor-pointer hover:text-red-500"
            onClick={handleLogout}
          />
        </div>
      ) : (
        <button
          className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          onClick={handleLogin}
        >
          <FaSignInAlt size={20} />
          <span>Log in</span>
        </button>
      )}
    </nav>
  );
};

export default Header;
