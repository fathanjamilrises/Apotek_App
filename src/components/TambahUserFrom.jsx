import React, { useState } from 'react';

function TambahUserForm({ closeModal }) {
  const apiURL = import.meta.env.VITE_API_URL;

  // State untuk menyimpan nilai input form
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // State untuk menyimpan status loading dan error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'role') setRole(value);
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validasi input
    if (!username || !email || !password || !role) {
      setError('Semua field harus diisi');
      setIsLoading(false);
      return;
    }

    // Membuat objek data dari input
    const userData = {
      username,
      name,
      email,
      password,
      role,
    };

    try {
      // Mengirim data ke API menggunakan fetch
      const res = await fetch(`${apiURL}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userData),
      });

      // Cek apakah responsnya berhasil
      if (!res.ok) {
        const errorData = await res.json(); // Menangkap respons error dari API
        console.log('Error:', errorData);
      }

      const data = await res.json();
      if (data.success) {
        console.log('User berhasil ditambahkan:', data);
        closeModal(); // Menutup modal jika berhasil
      }throw new Error(data);
     
      
    } catch (error) {
      // Menampilkan pesan error yang lebih informatif
      setError(error.message || 'Terjadi kesalahan, coba lagi');
      console.error('Tidak dapat menambahkan data:', error);
    } finally {
      setIsLoading(false); // Set loading selesai
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Tambah User</h2>
        <form onSubmit={handleSubmit}>
          {/* Input Username */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Masukkan username"
            />
          </div>

          {/* Input Nama */}
          <div className="mb-4">
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Masukkan nama"
            />
          </div>
          {/* Input Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Masukkan email"
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Masukkan password"
            />
          </div>

          {/* Select Role */}
          <div className="mb-4">
            <label className="block text-gray-700">Tipe User</label>
            <select
              name="role"
              value={role}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="">Pilih Tipe User</option>
              <option value="apoteker">Apoteker</option>
              <option value="kasir">Kasir</option>
            </select>
          </div>

          {/* Tampilkan error jika ada */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end">
            <button type="button" className="btn btn-ghost mr-2" onClick={closeModal}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TambahUserForm;
