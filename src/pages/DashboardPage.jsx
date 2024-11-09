import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LogAktifitas from "../components/LogAktifitas";
import moment from "moment";
const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = moment(currentTime).format("HH:mm:ss");

  return (
    <div className="flex min-h-screen ">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-y-auto bg-slate-300 flex-1">
          <div className="mx-20">
            <h1 className="text-3xl font-sans font-bold text-black  mt-10">
              Dashboard
            </h1>
            <div className="px-2 w-1/3 py-2 font-sans font-medium bg-slate-50 shadow-md mt-5 rounded-md">
              <p>Time : {formattedTime}</p>
            </div>
            <div className="mt-10 flex flex-row justify-center gap-5">
              <div className="card bg-white w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-lg font-normal">Stok Obat</h2>
                  <div className="flex">
                    <h1 className="text-3xl font-bold  text-blue-700">90</h1>
                    {/* isi dengan stok obat dari tabel obat */}
                  </div>
                </div>
              </div>
              <div className="card bg-white w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-lg font-normal">
                    Jumlah Karyawan
                  </h2>
                  <div className="flex">
                    <h1 className="text-3xl font-bold  text-blue-700">15</h1>
                  </div>
                  {/* isi sesuai dengan user dari tabel kelola user */}
                </div>
              </div>
              <div className="card bg-white w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-lg font-normal">
                    Total Transaksi
                  </h2>
                  <div className="flex">
                    <h1 className="text-3xl font-bold  text-blue-700">5</h1>
                  </div>
                  {/* isi dengan jumlah transaksi dari tabel transaksi */}
                </div>
              </div>
            </div>
          </div>
          <LogAktifitas />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
