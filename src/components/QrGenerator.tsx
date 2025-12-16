import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';

const QrGenerator: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [qrName, setQrName] = useState<string>('');
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (data) {
      setQrGenerated(true);
    } else {
      setQrGenerated(false);
      alert('Please enter data or a link!');
    }
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector('canvas');
      if (canvas) {
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = qrName ? `${qrName}.png` : 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-brand-light/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full text-center"
    >
      <h1 className="text-3xl font-bold text-brand-primary mb-6">QR Code Generator</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          className="w-full p-3 bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all duration-300"
          placeholder="Enter QR Code Name (optional)"
          value={qrName}
          onChange={(e) => setQrName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all duration-300"
          placeholder="Paste link or data here"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button
          className="w-full bg-brand-secondary text-white py-3 rounded-lg hover:bg-brand-accent transition-all duration-300 font-semibold transform hover:scale-105"
          onClick={handleGenerate}
        >
          Generate QR Code
        </button>
      </div>

      {qrGenerated && data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 p-6 bg-white/80 rounded-xl border border-gray-200 flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold text-brand-primary mb-4">Your QR Code:</h2>
          <div ref={qrCodeRef} className="p-3 bg-white border-2 border-brand-accent rounded-lg shadow-inner">
            <QRCodeCanvas value={data} size={256} level="H" includeMargin={false} />
          </div>
          <button
            className="mt-6 bg-brand-accent text-white py-2 px-8 rounded-lg hover:bg-brand-secondary transition-all duration-300 font-semibold transform hover:scale-105"
            onClick={handleDownload}
          >
            Download
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QrGenerator;
