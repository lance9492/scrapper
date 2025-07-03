import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import LivePrices from './pages/LivePrices';
import Materials from './pages/Materials';
import SalvageHub from './pages/SalvageHub';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import HowItWorks from './pages/HowItWorks';
import MaterialsGuide from './pages/MaterialsGuide';
import Recyclers from './pages/Recyclers';
import Pricing from './pages/Pricing';
import Chat from './components/Chat';
import Vehicles from './pages/salvage/Vehicles';
import Machinery from './pages/salvage/Machinery';
import Parts from './pages/salvage/Parts';
import VehicleStripping from './pages/salvage/VehicleStripping';
import ContainerRequests from './pages/dashboard/ContainerRequests';
import Profile from './pages/dashboard/Profile';
import MyAgents from './pages/dashboard/MyAgents';
import TrackRequest from './pages/TrackRequest';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useSEO } from './hooks/useSEO';

function AppContent() {
  useScrollToTop();
  useSEO();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace/*" element={<Marketplace />} />
          <Route path="/marketplace/prices" element={<LivePrices />} />
          <Route path="/marketplace/materials" element={<Materials />} />
          <Route path="/marketplace/recyclers" element={<Recyclers />} />
          <Route path="/salvage" element={<SalvageHub />} />
          <Route path="/salvage/vehicles" element={<Vehicles />} />
          <Route path="/salvage/machinery" element={<Machinery />} />
          <Route path="/salvage/parts" element={<Parts />} />
          <Route path="/salvage/stripping" element={<VehicleStripping />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/materials-guide" element={<MaterialsGuide />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard/containers" element={<ContainerRequests />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/agents" element={<MyAgents />} />
          <Route path="/track/:id" element={<TrackRequest />} />
        </Routes>
      </main>
      <Footer />
      <Chat />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;