import { Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import HomePage from "./pages/Home/Home";


function App() {
  return (
    <>
      <Navbar />

      <main>
      <HomePage/>
        
        
        
      </main>
      <Footer/>
    </>
  );
}

export default App;