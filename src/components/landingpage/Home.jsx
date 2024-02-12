import { Link } from "react-router-dom";
import { useState } from "react";
import OpenAI from "openai";

function Home() {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Transaksi aman dan Rekening Bersama di RekberIn: ${prompt}`,
        temperature: 0.5,
        max_tokens: 100,
      });
      setResult(response.choices[0].text);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <main id="home">
      <div className="container">
        <div className="row">
          <div className="col-kiri col-12 col-md-6">
            <h1 className="fw-bold head-judul">
              Transaksi Aman bersama RekberIn
            </h1>
            <p className="head-desc">
              Dengan RekberIn, Anda bisa bertransaksi antar Penjual dan Pembeli
              dengan aman menggunakan metode Rekening Bersama.
            </p>
            <p className="pt-2">Sejak ©2023</p>
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
        <div className="row implementasiai">
          <div className="col col-5 d-flex">
            <input
              type="text"
              className="form-control border-1 inputai"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything"
            />
            <button
              className="btn buttonai ms-2"
              onClick={handleClick}
              disabled={loading || prompt.length === 0}
            >
              Test
            </button>
          </div>
          <div className="col-8 pt-3">
            <pre className="result">{result}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

// import { Link } from "react-router-dom";
// import { useState } from "react";
// import OpenAI from "openai";

// function Home() {
//   const openai = new OpenAI({
//     apiKey: "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",
//     dangerouslyAllowBrowser: true,
//   });

//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     setLoading(true);
//     try {
//       const response = await openai.completions.create({
//         model: "text-davinci-003",
//         prompt: `Transaksi aman dan Rekening Bersama di RekberIn: ${prompt}`,
//         temperature: 0.5,
//         max_tokens: 100,
//       });
//       setResult(response.choices[0].text);
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };
//   return (
//     <main id="home">
//       <div className="container">
//         <div className="row">
//           <div className="col-kiri col-12 col-md-6">
//             <h1 className="fw-bold head-judul">
//               Transaksi Aman bersama RekberIn
//             </h1>
//             <p className="head-desc">
//               Dengan RekberIn, Anda bisa bertransaksi antar Penjual dan Pembeli
//               dengan aman menggunakan metode Rekening Bersama.
//             </p>
//             <p className="pt-2">Sejak ©2023</p>
//             <div className="pt-4">
//               <Link to="/login-buyer">
//                 <button className="btn btn-primary me-4">Pembeli</button>
//               </Link>
//               <Link to="/login-seller">
//                 <button className="btn btn-primary">Penjual</button>
//               </Link>
//             </div>
//           </div>
//           <div className="col col-12 col-md-6">
//             <img src="./transaksi.png" className="img-fluid" alt="" />
//           </div>
//         </div>
//         <div className="row implementasiai">
//           <div className="col col-5 d-flex">
//             <input
//               type="text"
//               className="form-control border-1 inputai"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Ask anything"
//             />
//             <button
//               className="btn buttonai ms-2"
//               onClick={handleClick}
//               disabled={loading || prompt.length === 0}
//             >
//               Test
//             </button>
//           </div>
//           <div className="col-8 pt-3">
//             <pre className="result">{result}</pre>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Home;

// import { Link } from "react-router-dom";
// import { useState } from "react";
// import OpenAI from "openai";

// function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const apiKey =
//     process.env.REACT_APP_OPENAI_API_KEY ||
//     "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";

//   const openai = new OpenAI({
//     apiKey,
//     dangerouslyAllowBrowser: true,
//   });
//   const handleClick = async () => {
//     setLoading(true);
//     try {
//       const response = await openai.completions.create({
//         model: "text-davinci-003",
//         prompt: `Transaksi aman dan Rekening Bersama di RekberIn: ${prompt}`,
//         temperature: 0.5,
//         max_tokens: 100,
//       });
//       setResult(response.choices[0].text);
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   return (
//     <main id="home">
//       <div className="container">
//         <div className="row">
//           <div className="col-kiri col-12 col-md-6">
//             <h1 className="fw-bold head-judul">
//               Transaksi Aman bersama RekberIn
//             </h1>
//             <p className="head-desc">
//               Dengan RekberIn, Anda bisa bertransaksi antar Penjual dan Pembeli
//               dengan aman menggunakan metode Rekening Bersama.
//             </p>
//             <p className="pt-2">Sejak ©2023</p>
//             <div className="pt-4">
//               <Link to="/login-buyer">
//                 <button className="btn btn-primary me-4">Pembeli</button>
//               </Link>
//               <Link to="/login-seller">
//                 <button className="btn btn-primary">Penjual</button>
//               </Link>
//             </div>
//           </div>
//           <div className="col col-12 col-md-6">
//             <img src="./transaksi.png" className="img-fluid" alt="" />
//           </div>
//         </div>
//         <div className="row implementasiai">
//           <div className="col col-5 d-flex">
//             <input
//               type="text"
//               className="form-control border-1 inputai"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Ask anything"
//             />
//             <button
//               className="btn buttonai ms-2"
//               onClick={handleClick}
//               disabled={loading || prompt.length === 0}
//             >
//               Test
//             </button>
//           </div>
//           <div className="col-8 pt-3">
//             <pre className="result">{result}</pre>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Home;
