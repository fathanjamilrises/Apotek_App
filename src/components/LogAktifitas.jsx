import { useState, useEffect } from "react";
import moment from "moment";
const LogAktifitas = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [logAktifitas, setLogAktifitas] = useState([]);

  useEffect(() => {
    const fetchLogAktifitas = async () => {
      try {
        const response = await fetch(`${apiURL}/log-aktifitas`);
        const data = await response.json();
        setLogAktifitas(data.data);
      } catch (error) {
        console.error("Error fetching log aktifitas:", error);
      }
    };

    fetchLogAktifitas();
  }, []);
  return (
    <div className="mt-20 mx-auto bg-white w-1/2 rounded-md p-2">
      <h1 className="text-3xl font-sans font-bold text-black mt-5 text-center">
        Log Aktifitas
      </h1>
      <div className="overflow-x-auto mt-10 ">
        <table className="table table-zebra w-full p-5">
          <thead>
            <tr>
              <th>Id_Log</th>
              <th>Username</th>
              <th>Waktu</th>
              <th>Aktifitas</th>
            </tr>
          </thead>
          <tbody>
            {logAktifitas.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.username}</td>
                <td>{moment(log.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                <td>{log.aktifitas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogAktifitas;
