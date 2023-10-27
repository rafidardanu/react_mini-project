import { Link } from "react-router-dom";
function Home() {
  return (
    <main id="home">
      <div className="container">
        <div className="row">
          <div className="col-kiri col-12 col-md-6">
            <h1 className="fw-bold head-judul">
              Transaksi Aman bersama RekberIn
            </h1>
            <p className="head-desc">
              Dengan RekberIn anda bisa bertransaksi antar Penjual dan Pembeli
              dengan aman menggunakan metode Rekening Bersama.
              <p className="pt-2">sejak ©2023</p>
            </p>
            <div className="pt-4">
              <Link to="/login-buyer">
                <button className="btn btn-primary me-4">Pembeli</button>
              </Link>
              <Link to="/login-seller">
                <button className="btn btn-primary">Penjual</button>
              </Link>
            </div>
          </div>
          <div className="col col-12 col-md-6">
            <img src="./transaksi.png" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
