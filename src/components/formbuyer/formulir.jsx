import { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://opoelgobmiysczmqcaic.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wb2VsZ29ibWl5c2N6bXFjYWljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNDE3ODksImV4cCI6MjAxMzYxNzc4OX0.32j7MR0e_pSOA1VrxyH5cF3dRxQxE_jSLZc-rhd979w"
);

function Formulir() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputObject, setInputObject] = useState("");
  const [choiceDelivery, setChoiceDelivery] = useState("Choice");
  const [priceObject, setPriceObject] = useState("");
  const [priceSending, setPriceSending] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [transfer, setTransfer] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [objectError, setObjectError] = useState("");
  const [deliveryError, setDeliveryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [priceSendingError, setSendingError] = useState("");
  const [descError, setDescError] = useState("");
  const [transferError, setTransferError] = useState("");

  const [tableData, setTableData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const nameChange = (e) => {
    const value = e.target.value;
    setInputName(value);
    if (value.trim() === "") {
      setNameError("Nama Penerima harus diisi");
    } else {
      setNameError("");
    }
  };
  const emailChange = (e) => {
    const value = e.target.value;
    setInputEmail(value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(value)) {
      setEmailError("Email tidak valid");
    } else {
      setEmailError("");
    }
  };
  const phoneChange = (e) => {
    const value = e.target.value;
    setInputPhone(value);
    const phoneRegex = /^0\d{9,12}$/;

    if (!phoneRegex.test(value)) {
      setPhoneError("Nomor telepon 08xx");
    } else {
      setPhoneError("");
    }
  };
  const adressChange = (e) => {
    const value = e.target.value;
    setInputAddress(value);
    if (value.trim() === "") {
      setAddressError("Alamat tidak boleh kosong");
    } else {
      setAddressError("");
    }
  };
  const objectChange = (e) => {
    const value = e.target.value;
    setInputObject(value);
    if (value.trim() === "") {
      setObjectError("Nama barang harus diisi");
    } else {
      setObjectError("");
    }
  };
  const deliveryChange = (e) => {
    const value = e.target.value;
    setChoiceDelivery(value);
    if (value === "Choice") {
      setDeliveryError("Harus memilih Jasa Pengiriman");
    } else {
      setDeliveryError("");
    }
  };
  const handleHargaBarangChange = (e) => {
    const value = e.target.value;
    setPriceObject(value);
    if (value === "") {
      setPriceError("Harga barang harus diisi");
    } else {
      setPriceError("");
      calculateTotalHarga(value, priceSending);
    }
  };
  const handleHargaOngkirChange = (e) => {
    const value = e.target.value;
    setPriceSending(value);
    if (value === "") {
      setSendingError("Harga ongkir harus diisi");
    } else {
      setSendingError("");
      calculateTotalHarga(priceObject, value);
    }
  };
  const calculateTotalHarga = (barang, ongkir) => {
    if (barang !== "" && ongkir !== "") {
      const total = parseFloat(barang) + parseFloat(ongkir);
      setTotalPrice(total.toFixed(2));
    } else {
      setTotalPrice("");
    }
  };
  const catatanChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value.trim() === "") {
      setDescError("Kirim Catatan ke Penjual");
    } else {
      setDescError("");
    }
  };
  const buktiTransferChange = async(e) => {
    const value = e.target.files[0];
    setTransfer(value);
    const { data, error } = await supabase
      .storage
      .from('buktikirim')
      .upload(value.name, value, {
        upsert: true
      })
      console.log(data)
      console.log(error)
    if (value.trim() === "") {
      setTransferError("Bukti Transfer tidak boleh kosong");
    } else {
      setTransferError("");
    }
  };

  // Local Storage
  useEffect(() => {
    const storedTableData = localStorage.getItem("tableData");
    if (storedTableData) {
      setTableData(JSON.parse(storedTableData));
    }
  }, []);


  const isFormValid = () => {
    return (
      !nameError &&
      !emailError &&
      !phoneError &&
      !addressError &&
      !objectError &&
      choiceDelivery !== "Choice" &&
      !priceError &&
      !priceSendingError &&
      !descError &&
      !transferError
    );
  };

  // reset isi image
  const resetForm = () => {
    const transferInput = document.getElementById("imgTF");
    if (transferInput) {
      transferInput.value = "";
    }
  };

  // edit data di form
  const editData = (index) => {
    const dataToEdit = tableData[index];
    setInputName(dataToEdit.name);
    setInputEmail(dataToEdit.email);
    setInputPhone(dataToEdit.phone);
    setInputAddress(dataToEdit.address);
    setInputObject(dataToEdit.object);
    setChoiceDelivery(dataToEdit.delivery);
    setPriceObject(dataToEdit.price);
    setPriceSending(dataToEdit.ongkir);
    setTotalPrice(dataToEdit.total);
    setDescription(dataToEdit.desc);
    setTransfer(dataToEdit.imgTransfer);

    setIsEditing(true);
    setEditIndex(index);
  };

  // menampilkan konfirmasi dan tabel data
  const handleDataUpdate = (updatedData) => {
    const confirmationMessage = `Apakah data sudah benar?\n\nNama Penerima: ${updatedData.name}\nEmail: ${updatedData.email}\nNo Telepon: ${updatedData.phone}\nAlamat Penerima: ${updatedData.address}\nNama Barang: ${updatedData.object}\nJasa Pengiriman: ${updatedData.delivery}\nHarga Barang + Harga Ongkir = Rp.${updatedData.total}\nCatatan: ${updatedData.desc}`;

    if (window.confirm(confirmationMessage)) {
      const updatedTableData = [...tableData];
      if (isEditing) {
        updatedTableData[editIndex] = updatedData;
      } else {
        updatedTableData.push(updatedData);
      }
      setTableData(updatedTableData);
      localStorage.setItem("tableData", JSON.stringify(updatedTableData));

      // Reset the form
      setIsEditing(false);
      setEditIndex(-1);
      setInputName("");
      setInputEmail("");
      setInputPhone("");
      setInputAddress("");
      setInputObject("");
      setChoiceDelivery("Choice");
      setPriceObject("");
      setPriceSending("");
      setTotalPrice("");
      setDescription("");
      setTransfer("");
    }
  };

  // Get
  const apiURL = "https://651b9f60194f77f2a5ae9f3f.mockapi.io/data";
  const fetchData = async () => {
    try {
      const response = await axios.get(apiURL);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Post
  const postData = async (data) => {
    try {
      if (isEditing) {
        await axios.put(`${apiURL}/${tableData[editIndex].id}`, data);
      } else {
        await axios.post(apiURL, data);
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // Delete
  const deleteData = async (index) => {
    const dataToDelete = tableData[index];
    const confirmDelete = window.confirm(
      "Jika sudah diterima maka Data akan Terhapus"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${apiURL}/${dataToDelete.id}`);
        const updatedTableData = [...tableData];
        updatedTableData.splice(index, 1);
        setTableData(updatedTableData);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  // Update
  const handleSubmit = () => {
    const { data } = supabase.storage
      .from("buktikirim")
      .getPublicUrl(transfer.name);
    if (isFormValid()) {
      const newData = {
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
        address: inputAddress,
        object: inputObject,
        delivery: choiceDelivery,
        price: priceObject,
        ongkir: priceSending,
        total: totalPrice,
        desc: description,
        imgTransfer: data.publicUrl,
      };
      postData(newData);
      handleDataUpdate(newData);
      resetForm();
    }
  };

  // Update
  const updateData = () => {
    if (isFormValid()) {
      const updatedData = {
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
        address: inputAddress,
        object: inputObject,
        delivery: choiceDelivery,
        price: priceObject,
        ongkir: priceSending,
        total: totalPrice,
        desc: description,
        imgTransfer: transfer,
      };
      postData(updatedData);
      handleDataUpdate(updatedData);
      resetForm();
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin Keluar?")
    if (confirmLogout) {
      console.log("Berhasil Keluar");
    }
  };

  return (
    <div id="Formulir">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-12">
            <div className="desc-form text-center">
              <img src="logo2.png" alt="logo" className="" />
              <h1 className="text-white fw-bold">Form Untuk Pembeli</h1>
              <p className="text-white pt-4">
                Kami sarankan kepada para pembeli untuk melakukan transfer
                pembayaran terlebih dahulu sebelum mengisi formulir pembelian.
                Langkah ini akan membantu memastikan keamanan transaksi Anda.
                Setelah Anda menyelesaikan transfer, Anda dapat melanjutkan
                dengan mengisi formulir pembelian dengan data yang akurat.
              </p>
              <Link
                to="/login-buyer"
                className="btn btn-danger mt-4"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-2" />
                Keluar
              </Link>
            </div>
            <div className="main-form">
              <div>
                <h3 className="text-white fw-bold mb-4">Formulir Pembeli</h3>
              </div>
              <div className="mb-4">
                <label>Nama Penerima</label>
                <input
                  type="text"
                  className="form-control"
                  required=""
                  value={inputName}
                  onChange={nameChange}
                />
                <span className="text-danger fw-bold">{nameError}</span>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required=""
                      value={inputEmail}
                      onChange={emailChange}
                    />
                    <span className="text-danger fw-bold fw-bold">
                      {emailError}
                    </span>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-4">
                    <label>No Telepon</label>
                    <input
                      type="number"
                      className="form-control"
                      required=""
                      value={inputPhone}
                      onChange={phoneChange}
                    />
                    <span className="text-danger fw-bold">{phoneError}</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label>Alamat Penerima</label>
                <textarea
                  id="textDesc"
                  className="form-control"
                  required=""
                  value={inputAddress}
                  onChange={adressChange}
                />
                <span className="text-danger fw-bold">{addressError}</span>
              </div>
              <div className="mb-4">
                <label>Nama Barang</label>
                <input
                  type="text"
                  className="form-control"
                  required=""
                  value={inputObject}
                  onChange={objectChange}
                />
                <span className="text-danger fw-bold">{objectError}</span>
              </div>
              <div className="mb-4">
                <label>Jasa Pengiriman</label>
                <select
                  className="form-select"
                  value={choiceDelivery}
                  onChange={deliveryChange}
                >
                  <option disabled="" value="Choice"></option>
                  <option value="JNE">JNE</option>
                  <option value="Tiki">Tiki</option>
                  <option value="POS Indonesia">POS Indonesia</option>
                  <option value="J&T Express">J&T Express</option>
                  <option value="SiCepat">SiCepat</option>
                  <option value="Wahana">Wahana</option>
                  <option value="Ninja Xpress">Ninja Xpress</option>
                  <option value="AnterAja">AnterAja</option>
                </select>
                <span className="text-danger fw-bold">{deliveryError}</span>
              </div>
              <div className="row">
                <div className="mb-4 col">
                  <label>Harga Barang</label>
                  <input
                    type="number"
                    className="form-control"
                    required=""
                    value={priceObject}
                    onChange={handleHargaBarangChange}
                  />
                  <span className="text-danger fw-bold">{priceError}</span>
                </div>
                <div className="mb-4 col">
                  <label>Harga Ongkir</label>
                  <input
                    type="number"
                    className="form-control"
                    required=""
                    value={priceSending}
                    onChange={handleHargaOngkirChange}
                  />
                  <span className="text-danger fw-bold">
                    {priceSendingError}
                  </span>
                </div>
                <div className="mb-4 col">
                  <label>Total Harga</label>
                  <input
                    type="number"
                    className="form-control"
                    required=""
                    disabled
                    value={totalPrice}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label>Catatan</label>
                <textarea
                  className="form-control"
                  required=""
                  value={description}
                  onChange={catatanChange}
                />
                <span className="text-danger fw-bold">{descError}</span>
              </div>
              <div>
                <label htmlFor="formFile" className="form-label">
                  Bukti Transfer
                </label>
                <input
                  id="imgTF"
                  className="form-control"
                  type="file"
                  required=""
                  onChange={buktiTransferChange}
                />
                <span className="text-danger fw-bold">{transferError}</span>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5 mb-5">
              {isEditing ? (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={updateData}
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  id="submitButton"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
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
                <th>Alamat Penerima</th>
                <th>Nama Barang</th>
                <th>Jasa Kirim</th>
                <th>Total Harga</th>
                <th>Bukti Pembayaran</th>
                <th>Catatan</th>
                <th>No Resi</th>
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
                  <td>{data.undifined}</td>
                  <td style={{ minWidth: "200px" }}>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => editData(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(index)}
                    >
                      Terima
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
export default Formulir;
