import React from 'react';

function EditUserForm({ closeModal }) {

  const apiURL = import.meta.env.VITE_API_URL;




  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Masukkan username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Masukkan email"
            />
          </div>
          <div className='mb-4'>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Masukkan password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipe User</label>
            <select className="select select-bordered w-full">
              <option>Apoteker</option>
              <option>Kasir</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button 
              type="button"
              className="btn btn-ghost mr-2"
              onClick={closeModal}
            >
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
