import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
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
      className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">QR Code Generator</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter QR Code Name (optional)"
          value={qrName}
          onChange={(e) => setQrName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste link or data here"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
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
          className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your QR Code:</h2>
          <div ref={qrCodeRef} className="p-2 bg-white border border-gray-300 rounded-md">
            <QRCode value={data} size={256} level="H" includeMargin={false} />
          </div>
          <button
            className="mt-6 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 font-semibold"
            onClick={handleDownload}
          >
            Download QR Code
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QrGenerator;
