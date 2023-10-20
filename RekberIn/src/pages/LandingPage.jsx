import '../pages/assets/LandingPage.css'
import Navbar from '../components/landingpage/navbar';
import Home from '../components/landingpage/Home';
import Contact from '../components/landingpage/Contact';
import Footer from '../components/landingpage/Footer';

function LandingPage() {
    return (
      <>
        <Navbar />
        <Home />
        <Contact />
        <Footer />
      </>
    );
}

export default LandingPage;