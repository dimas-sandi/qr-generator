window.onload = () => {
    const qrNameInput = document.getElementById('qr-name');
    const dataInput = document.getElementById('data');
    const generateBtn = document.getElementById('generate-btn');
    const qrCodeContainer = document.getElementById('qr-code');
    const downloadLink = document.getElementById('download-link');

    generateBtn.addEventListener('click', () => {
        const qrName = qrNameInput.value;
        const data = dataInput.value;

        if (!data) {
            alert('Please enter data or a link!');
            return;
        }

        // Clear previous QR code
        qrCodeContainer.innerHTML = '';

        QRCode.toCanvas(document.createElement('canvas'), data, { width: 256, margin: 2 }, function (error, canvas) {
            if (error) {
                console.error(error);
                alert('Could not generate QR code.');
                return;
            }
            qrCodeContainer.appendChild(canvas);
            
            // Show download link
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = qrName ? `${qrName}.png` : 'qr_code.png';
            downloadLink.style.display = 'inline-block';
        });
    });
};
