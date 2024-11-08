import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../pocketbase';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await pb.authStore.clear();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
        toggleSidebar();
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } bg-base-100  shadow-md p-4`}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="absolute top-4 right-4 text-xl"
                onClick={toggleSidebar}
            >
                &times;
            </button>

            <h1 className="text-2xl font-bold text-blue-600 mb-4">Menu</h1>
            <ul className="menu text-base-content p-4 w-full font-sans font-semibold">
                <li className="mb-4 "><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
                <li className='mb-4 '><Link to="/stok-obat" onClick={toggleSidebar}>Stok Obat</Link></li>
                <li className='mb-4 '><Link to="/kelola-resep" onClick={toggleSidebar}>Kelola-Resep</Link></li>
                <li className='mb-4 '><Link to="/kelola-user" onClick={toggleSidebar}>Kelola User</Link></li>
                <li className='mb-4 '>
                    <button
                        className="btn btn-error text-base-content w-full"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
