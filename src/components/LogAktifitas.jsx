const LogAktifitas = () => {
    return (
        <div className='mt-20 mx-auto bg-white w-1/2 rounded-md p-2'>
            <h1 className='text-3xl font-sans font-bold text-black mt-5 text-center'>Log Aktifitas</h1>
            <div className='overflow-x-auto mt-10 '>
                <table className='table table-zebra w-full p-5'>
                    <thead>
                        <tr>
                            <th>Id_Log</th>
                            <th>Username</th>
                            <th>Waktu</th>
                            <th>Aktifitas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* isi dengan keterangan log aktifitas diatas */}
                            <td>1</td>
                            <td>Username</td>
                            <td>Waktu</td>
                            <td>Aktifitas</td>
                        </tr>
                        <tr>
                            {/* hapus ini sebagai contoh */}
                            <td>2</td>
                            <td>Username</td>
                            <td>Waktu</td>
                            <td>Aktifitas</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
    )
}

export default LogAktifitas;