import { useNavigate } from "react-router-dom"
import pb from "../pocketbase"
import { useState } from "react"
import React from "react"
import {FaUser, FaLock} from 'react-icons/fa'
import { Link } from "react-router-dom"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await pb.collection('Tbl_User').authWithPassword(username, password);
            navigate("/dashboard");
        } catch (err) {
            setError('Username atau password salah');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-w-screen min-h-screen bg-slate-300 flex items-center justify-center px-5 py-5">
            <div className="bg-white rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth: "1000px"}}>
                <div className="md:flex w-full">
                    <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-blue-600 py-10 px-10 justify-around items-center">
                        <h1 className="text-white font-bold text-3xl font-sans tracking-wide">Apotek Xyz</h1>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="text-gray-800 text-3xl font-bold font-sans tracking-wide">Login</h1>
                            <p className="text-gray-500">Login untuk melanjutkan</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="mb-5">
                                <label htmlFor="username" className="text-sm font-semibold text-gray-700 block mb-2">Username</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="username" 
                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        placeholder="Username"
                                    />
                                    <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-400">
                                           <FaUser/>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="Password"
                                    />
                                    <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-400">
                                            <FaLock/>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                            <div className="text-center mt-6">
                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                                >
                                    Login
                                </button>
                                <p className="mt-4 text-sm">Belum Punya Akun? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
