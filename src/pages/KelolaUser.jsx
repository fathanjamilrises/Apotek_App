import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TambahUserForm from '../components/TambahUserFrom';
import EditUserForm from '../components/EditForm';
import DeleteForm from '../components/DeleteForm';

function KelolaUser() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);  // State untuk ID pengguna yang dipilih

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const userId = localStorage.getItem('loggedInUserId');
    if (userId) {
      setLoggedInUserId(parseInt(userId));
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${apiURL}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Tidak dapat mengambil data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => user.id !== loggedInUserId && user.role !== 'admin');

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);
  const toggleDeleteModal = (userId) => {
    setSelectedUserId(userId);  // Set selected user ID saat tombol hapus diklik
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    fetchUsers(); // Refresh data saat modal ditutup
  };

  return (
    <div className='flex min-h-screen'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className='flex-1 flex flex-col'>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className='p-4 overflow-y-auto bg-slate-300 flex-1'>
          <div className='mx-20'>
            <h1 className='text-3xl font-sans font-bold text-black mt-10'>Kelola User</h1>
          </div>
          <div className='mt-10 flex justify-end'>
            <button className='btn btn-primary text-white text-md mr-5' onClick={toggleModal}>
              Tambah User
            </button>
          </div>

          {isModalOpen && <TambahUserForm closeModal={handleModalClose} />}
          {isEditModalOpen && <EditUserForm closeModal={handleModalClose} />}
          {isDeleteModalOpen && <DeleteForm closeModal={handleModalClose} userId={selectedUserId} refreshData={fetchUsers} />}
          
          <div className='mt-10 mx-auto bg-white rounded-md w-full'>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {/* Skeleton loading */}
                </div>
              ) : (
                <table className='table table-zebra'>
                  <thead>
                    <tr>
                      <th>Id_User</th>
                      <th>Username</th>
                      <th>Type_User</th>
                      <th>Email</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td className='flex'>
                          <button className='btn btn-square btn-primary text-white text-md mr-2' onClick={toggleEditModal}>
                          <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z" clip-rule="evenodd"/>
</svg>

                          </button>
                          <button className='btn btn-square btn-error text-white text-md' onClick={() => toggleDeleteModal(user.id)}>
                          <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
</svg>

                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default KelolaUser;
