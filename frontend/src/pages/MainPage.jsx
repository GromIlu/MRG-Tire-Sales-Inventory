import { useState } from 'react';
import { Menu, X, Settings, User, ArrowRight, Phone, Mail, MapPin, Circle } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export default function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


   const showAlert = (msg, path) => {
    setMessage(msg);
    setTimeout(() => {
      navigate(path);
    }, 1500); // Wait 1.5s then redirect
  };


  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* ✅ Tailwind Toast Alert */}
      {message && (
        <div className="fixed top-5 right-5 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          {message}
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-500 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-red-600 rounded-xl mr-2 shadow-md">
              <Circle className="w-6 h-6 text-white" />
            </div>
            MRG-Tire-System
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollTo('home')} className="hover:text-indigo-500 transition-colors">Home</button>
            <button onClick={() => scrollTo('about')} className="hover:text-indigo-500 transition-colors">About</button>
            <button onClick={() => scrollTo('mission')} className="hover:text-indigo-500 transition-colors">Mission</button>
            <button onClick={() => scrollTo('vision')} className="hover:text-indigo-500 transition-colors">Vision</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-indigo-500 transition-colors">Contact</button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4">
            {['home', 'about', 'mission', 'vision', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="block w-full text-left py-2 hover:text-indigo-500 capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className="py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-indigo-500">Mrg-Tire-System</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto px-6">
          Your trusted partner for premium tires and automotive solutions
        </p>
 {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto px-6">
        {/* Admin */}
        <div
          onClick={() => showAlert("Redirecting to Admin Portal...", "/admin/adminlogin")}
          className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer transition-all hover:scale-105"
        >
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-6 h-6 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Admin Portal</h3>
          <p className="text-gray-600 text-sm">Manage system and inventory</p>
          <ArrowRight className="w-4 h-4 mx-auto mt-3 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* User */}
        <div
          onClick={() => showAlert("Redirecting to Customer Portal...", "/login")}
          className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg cursor-pointer transition-all hover:scale-105"
        >
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Customer Portal</h3>
          <p className="text-gray-600 text-sm">Access your account and orders</p>
          <ArrowRight className="w-4 h-4 mx-auto mt-3 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-500">About Mrg-Tire-System</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Mrg-Tire-System has been serving the automotive community with premium tire solutions and exceptional service. 
            We combine years of expertise with cutting-edge technology to ensure every customer receives the perfect 
            tire solution for their vehicle and driving needs.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-500">Our Mission</h2>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <p className="text-lg text-gray-600 leading-relaxed">
              To provide exceptional tire solutions and automotive services that ensure safety, performance, 
              and reliability for every journey. We are committed to delivering quality products and expert 
              guidance to keep you moving forward with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-indigo-500">Our Vision</h2>
          <div className="bg-gray-50 rounded-xl p-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              To be the leading tire retailer recognized for innovation, customer satisfaction, and sustainable 
              practices. We envision a future where every vehicle is equipped with the perfect tire for optimal 
              performance, safety, and environmental responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-indigo-500">Contact Admin</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567' },
              { icon: Mail, title: 'Email', info: 'admin@Mrg-Tire-System.com' },
              { icon: MapPin, title: 'Location', info: '123 Tire Street, Auto City' }
            ].map(({ icon: Icon, title, info }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>© 2025 Mrg-Tire-System. All rights reserved.</p>
      </footer>
    </div>
  );
}