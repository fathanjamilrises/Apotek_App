import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import pb from "../pocketbase"; // Sesuaikan path jika perlu

const Navbar = ({ toggleSidebar }) => {
  const [name, setUsername] = useState("");

  useEffect(() => {
    const currentUser = pb.authStore.model; 
    if (currentUser) {
      setUsername(currentUser.name);
    }
  }, []);

  return (
    <div className="navbar bg-slate-50 shadow-md p-4 text-black">
      <div className="navbar-start">
        <button className="btn btn-ghost" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div className="navbar-center">
        <a className="text-xl font-semibold text-black text-center">Apotek Xyz</a>
      </div>

      <div className="navbar-end flex items-center space-x-2 mr-4">
        <FaUserCircle className="w-8 h-8 text-gray-600" />
        <span className="text-black font-medium">{name || "Guest"}</span>
      </div>
    </div>
  );
};

export default Navbar;
