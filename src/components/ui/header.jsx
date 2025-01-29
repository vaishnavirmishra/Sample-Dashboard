import React, { useState } from 'react';
import {
  FiSearch,
  FiMessageSquare,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function Header() {
  const [dropVisible, setDropVisible] = useState(false);
  const navigate = useNavigate();

  function toggleDropDown() {
    setDropVisible((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/signin')
  }
  
  return (
    <header className="border-b shadow-sm bg-white fixed w-full z-[99]">
    <div className="w-full  px-10 h-16 flex items-center justify-between  ">
      {/* Logo */}
      <div className="flex items-start gap-2">
        <img src="/logo.png" className="h-[50px]" alt="icon" />
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl  ml-[-18%] ">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-between gap-6 ">
        <button className="text-gray-600 hover:text-gray-900">
          <FiMessageSquare className="w-6 h-6" />
        </button>
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-900">
            <FiBell className="w-6 h-6" />
          </button>
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#1abc9c] text-white text-xs flex items-center justify-center rounded-full">
            5
          </span>
        </div>
        <div className="flex items-center gap-20">
          <div className="flex items-center gap-3">
            <img
              src="/loyd.png"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">Admin</span>
          </div>
          <FiChevronDown className="w-4 h-4 text-gray-400 ml-[20px]" onClick={toggleDropDown} />
          {dropVisible && (
            <div className='absolute mt-36 shadow-md right-12 cursor-pointer bg-white rounded-md px-16 py-6'>
              <p className='text-red-500 hover:text-underline' onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header