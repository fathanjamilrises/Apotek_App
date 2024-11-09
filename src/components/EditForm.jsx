import React from "react";
import { useState, useEffect } from "react";
function EditUserForm({ closeModal }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const apiURL = import.meta.env.VITE_API_URL;
  const id = localStorage.getItem("selectedUserId");
  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("selectedUserId");
      try {
        const res = await fetch(`${apiURL}/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const result = await res.json();
        const user = result.data;
        setUsername(user.username);
        setPassword(user.password);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${apiURL}/users/${localStorage.getItem("selectedUserId")}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          username,
          name,
          email,
          password,
          role,
        }),
      }
    );
    const result = await res.json();
    localStorage.removeItem("selectedUserId");
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Masukkan Nama"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Masukkan username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Masukkan email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Masukkan password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipe User</label>
            <select
              className="select select-bordered w-full"
              onChange={(e) => setRole(e.target.value)}
            >
              {role == "kasir" ? (
                <>
                  <option>Kasir</option>
                  <option>Apoteker</option>
                </>
              ) : (
                <>
                  <option>Apoteker</option>
                  <option>Kasir</option>
                </>
              )}
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
