function Contact() {
    return (
      <div id="contact">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-7 con-kiri">
              <h1 className="fw-bold">Ada Masalah?</h1>
              <p className="prob-desc">
                Laporkan Permasalahan Anda pada Form disamping, Kami siap
                Membantu untuk Mengatasi Permasalahan yang ada.
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5">
              <form action="">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Nama</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Nama"
                      id="name"
                      required=""
                    />
                  </div>
                  <div className="col-6 mt-3">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Masukkan Email"
                      id="email"
                      required=""
                    />
                  </div>
                  <div className="col-6 mt-3">
                    <label htmlFor="">No Telepon</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Masukkan Telepon"
                      id="number"
                      required=""
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <label htmlFor="">Permasalahan</label>
                    <textarea
                      name="text"
                      className="form-control"
                      style={{ height: "110px" }}
                      placeholder="Ceritakan masalah anda"
                      id="text"
                      required=""
                    ></textarea>
                  </div>
                  <div className="col-6 mt-3">
                    <button className="btn btn-secondary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Contact