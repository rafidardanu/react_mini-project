import "bootstrap/dist/css/bootstrap.min.css";
import WhatsAppLogo from "bootstrap-icons/icons/whatsapp.svg";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

function ForgotPassword() {
  return (
    <div className="forgot-password text-center mx-auto mt-5 bg-white p-5 rounded shadow-md max-w-md">
      <h2 className="text-2xl text-gray-700 fw-bold">Lupa Password?</h2>
      <p className="text-gray-600 mt-4">
        Untuk mereset password, silahkan hubungi admin kami melalui WhatsApp
      </p>
      <a
        href="https://www.whatsapp.com"
        className="btn btn-success btn-lg mt-4"
      >
        <img src={WhatsAppLogo} alt="WhatsApp Logo" className="me-2" />
        Hubungi Admin
      </a> <br />
      <Link to="/">
        <button className="btn btn-primary btn-lg mt-4">
          <AiOutlineHome className="me-2" /> Home
        </button>
      </Link>
    </div>
  );
}

export default ForgotPassword;
