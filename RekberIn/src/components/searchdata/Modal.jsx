import PropTypes from "prop-types";
import "./Modal.css";

function Modal({ show, onClose, data }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Detail Data</h2>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>
        <p>Address: {data.address}</p>
        <p>Object: {data.object}</p>
        <p>Delivery: {data.delivery}</p>
        <p>Total: {data.total}</p>
        <p>Description: {data.desc}</p>
        <img src={data.imgTransfer} alt="Bukti Pembayaran" />
        <p>Resi: {data.undifined}</p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Modal;
