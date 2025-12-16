from flask import Flask, render_template, request, send_file, redirect, url_for
import qrcode
import io
import base64

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    qr_img_data = None
    data = None
    if request.method == 'POST':
        data = request.form.get('data')
        if data:
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill='black', back_color='white')
            img_io = io.BytesIO()
            img.save(img_io, 'PNG')
            img_io.seek(0)
            qr_img_data = base64.b64encode(img_io.getvalue()).decode('utf-8')
    return render_template('index.html', qr_img_data=qr_img_data, data=data)

@app.route('/download')
def download():
    data = request.args.get('data')
    if data:
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(data)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')
        img_io = io.BytesIO()
        img.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='qr_code.png')
    # Handle case where data is not provided, maybe redirect or show an error
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
