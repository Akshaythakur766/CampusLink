import QRCode from 'qrcode.react';

export const QRCodeComponent = ({ value }:{value:string}) => {
    return (
        <div>
            <h2>Scan the QR Code</h2>
            <QRCode value={value} size={200}/>
        </div>
    );
}

export default QRCodeComponent;
