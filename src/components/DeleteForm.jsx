import React from 'react';

function DeleteForm({ closeModal, userId, refreshData }) {
    const apiURL = import.meta.env.VITE_API_URL;

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error('User ID is missing');
            return;
        }

        try {
            const res = await fetch(`${apiURL}/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Terjadi kesalahan saat menghapus data');
            }

            const data = await res.json();
            console.log('Data berhasil dihapus:', data);

            if (refreshData) {
                refreshData();
            }
            closeModal();

        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="card w-1/3 bg-base-100">
                <div className="card-body">
                    <form onSubmit={handleDelete}>
                        <h2 className="card-title">Hapus Data</h2>
                        <p>Apakah anda yakin ingin menghapus data ini?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-error text-white" type="submit">
                                Hapus
                            </button>
                            <button
                                className="btn"
                                onClick={closeModal}
                                type="button"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteForm;
