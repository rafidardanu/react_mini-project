import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { FaSignOutAlt } from "react-icons/fa";
import "./assets/SeacrhData.css";

function SeacrhData() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("https://651b9f60194f77f2a5ae9f3f.mockapi.io/data")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleResiChange = (e, index) => {
    const updatedData = [...tableData];
    updatedData[index].undifined = e.target.value;
    setTableData(updatedData);
  };

  const updateUndifined = (index, undifined) => {
    const updatedData = [...tableData];
    const dataToUpdate = updatedData[index];
    axios
      .put(
        `https://651b9f60194f77f2a5ae9f3f.mockapi.io/data/${dataToUpdate.id}`,
        {
          undifined: undifined,
        }
      )
      .then(() => {
        console.log("Resi/Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating Resi/Status:", error);
      });

    setTableData(updatedData);
  };

    const handleLogout = () => {
      const confirmLogout = window.confirm("Yakin Keluar?");

      if (confirmLogout) {
        console.log("Berhasil Keluar");
      }
    };

  return (
    <>
      <div id="cari-data">
        <div className="container">
          <div className="row justify-content-center">
            <div className="desc-form text-center col-lg-5 col-md-12">
              <img src="logo2.png" alt="logo" className="" />
              <h1 className="text-white fw-bold">Data Pembeli</h1>
              <p className="text-white pt-4">
                Penjual memilih Data Pembeli Sesuai Kesepakatan,
                <br />
                kemudian Mengirimkan Barang dan Menginputkan Resi.
              </p>
              <Link
                to="/login-seller"
                className="btn btn-danger mt-4"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Keluar
              </Link>
            </div>
          </div>
        </div>
        <section id="table-hasil">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Nama Penerima</th>
                  <th>No Telepon</th>
                  <th>Alamat Pengiriman</th>
                  <th>Nama Barang</th>
                  <th>Jasa Pengirim</th>
                  <th>Total Pembayaran</th>
                  <th>Bukti Pembayaran</th>
                  <th>Catatan</th>
                  <th>Resi/Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index} className="table-cell">
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.address}</td>
                    <td>{data.object}</td>
                    <td>{data.delivery}</td>
                    <td>{data.total}</td>
                    <td>
                      <img
                        src={data.imgTransfer}
                        alt="Bukti Pembayaran"
                        className="img-thumbnail"
                        style={{ maxWidth: "150px" }}
                      />
                    </td>
                    <td>{data.desc}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={data.undifined}
                        onChange={(e) => handleResiChange(e, index)}
                      />
                    </td>
                    <td style={{ minWidth: "120px" }}>
                      <button
                        className="btn btn-success"
                        onClick={() => updateUndifined(index, data.undifined)}
                      >
                        Update Resi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default SeacrhData;
