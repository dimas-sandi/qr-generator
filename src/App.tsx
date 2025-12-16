import React from 'react';
import QrGenerator from './components/QrGenerator';
import Footer from './components/Footer';
import './App.css'; // This will contain global styles or specific app styles

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <QrGenerator />
      <Footer />
    </div>
  );
};

export default App;