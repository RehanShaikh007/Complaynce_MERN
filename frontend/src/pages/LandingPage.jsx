import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <div className="text-xl font-bold">Complaynce</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/login" className="bg-white text-blue-600 px-4 py-2 rounded">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="h-screen bg-blue-600 text-white flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-semibold mb-4">Welcome to Complaynce</h1>
        <p className="text-lg mb-8">Your ultimate solution for Servcies.</p>
        <a href="#features" className="bg-yellow-500 text-blue-600 px-6 py-3 rounded-lg text-xl">Explore Features</a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <h2 className="text-3xl text-center font-semibold mb-12">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-2xl font-semibold mb-4">Feature One</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iste.</p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-2xl font-semibold mb-4">Feature Two</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, minus?</p>
          </div>
          {/* Feature 3 */}
          <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-2xl font-semibold mb-4">Feature Three</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, nemo.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">About Complaynce</h2>
          <p className="text-lg mb-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, hic corporis alias doloremque quo quas magni! Commodi eum dolorum sint.</p>
          <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Contact Us</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>&copy; 2024 Complaynce. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#privacy" className="text-white">Privacy Policy</a>
          <a href="#terms" className="text-white">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
