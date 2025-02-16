
import { saveAs } from 'file-saver';

export type InputType = 'url' | 'email' | 'phone' | 'wifi' | 'text';
export type DownloadFormat = 'png' | 'svg' | 'jpg';

export interface QRConfig {
  type: InputType;
  value: string;
}

export const formatQRData = (config: QRConfig): string => {
  switch (config.type) {
    case 'url':
      return config.value.startsWith('http') ? config.value : `https://${config.value}`;
    case 'email':
      return `mailto:${config.value}`;
    case 'phone':
      return `tel:${config.value}`;
    case 'wifi':
      return `WIFI:T:WPA;S:${config.value};P:${config.value};;`;
    default:
      return config.value;
  }
};

export const downloadQRCode = (format: DownloadFormat, qrRef: HTMLCanvasElement | null) => {
  if (!qrRef) return;

  const canvas = qrRef;
  let dataUrl: string;

  switch (format) {
    case 'svg':
      const svgData = new XMLSerializer().serializeToString(qrRef);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      saveAs(svgBlob, 'qrcode.svg');
      break;
    case 'jpg':
      dataUrl = canvas.toDataURL('image/jpeg', 1.0);
      saveAs(dataUrl, 'qrcode.jpg');
      break;
    default:
      dataUrl = canvas.toDataURL('image/png');
      saveAs(dataUrl, 'qrcode.png');
  }
};

export const validateInput = (type: InputType, value: string): boolean => {
  switch (type) {
    case 'url':
      return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value);
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'phone':
      return /^\+?[\d\s-]{10,}$/.test(value);
    default:
      return value.length > 0;
  }
};
