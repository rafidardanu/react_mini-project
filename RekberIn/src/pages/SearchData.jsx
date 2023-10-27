import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import Modal from "../components/searchdata/Modal";
import "./assets/SearchData.css";

function SearchData() {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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

  const handleSearch = () => {
    const filteredData = tableData.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTableData(filteredData);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin Keluar?");
    if (confirmLogout) {
      console.log("Berhasil Keluar");
    }
  };

  const handleDetailClick = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setShowModal(false);
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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
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
                    <td style={{ minWidth: "250px" }}>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => updateUndifined(index, data.undifined)}
                      >
                        Update Resi
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => handleDetailClick(data)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {showModal && selectedData && (
                <Modal
                  show={showModal}
                  onClose={closeModal}
                  data={selectedData}
                />
              )}
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default SearchData;
