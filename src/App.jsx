
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AIFloatingAssistant from "./components/AIFloatingButton/AIFloatingButton";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Conditions from "./pages/Conditions/Conditions";
import Services from "./pages/Services/Services";
import Approach from "./pages/Approach/Approach";
import Contact from "./pages/Contact/Contact";
import Appointment from "./pages/Appointment/Appointment";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/services" element={<Services />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/contact" element={<Contact />} />
          
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>

      <Footer />
      <AIFloatingAssistant />
    </>
  );
}

export default App;
