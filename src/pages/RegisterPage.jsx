import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import pb from "../pocketbase";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }

        try {
            await pb.collection("Tbl_User").create({
                name,
                username,
                email,
                password,
                passwordConfirm: confirmPassword,
                type_user: "apoteker",
            });
            navigate("/");
        } catch (err) {
            setError("Gagal Membuat Akun");
            console.error("Register error:", err);
        }
    };

    return (
        <div className="min-w-screen min-h-screen bg-slate-300 flex items-center justify-center px-5 py-5">
            <div className="bg-white rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
                <div className="md:flex w-full">
                    <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-blue-600 py-10 px-10 justify-around items-center">
                        <h1 className="text-white font-bold text-3xl font-sans tracking-wide">Apotek Xyz</h1>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="text-gray-800 text-3xl font-bold font-sans tracking-wide">Register</h1>
                            <p className="text-gray-500">Daftar untuk membuat akun</p>
                        </div>

                        <form onSubmit={handleRegister}>
                            <div className="mb-5">
                                <label htmlFor="name" className="text-sm font-semibold text-gray-700 block mb-2">Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                    />
                                    <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-400">
                                            <FaUser />
                                        </span>
                                    </div>
                                </div>
                            </div>

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
                                            <FaUser />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-400">
                                            <FaEnvelope />
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
                                            <FaLock />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 block mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                    />
                                    <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-gray-400">
                                            <FaLock />
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
                                    Register
                                </button>
                                <p className="mt-4 text-sm">Sudah punya akun? <Link to="/" className="text-blue-600 hover:underline">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
