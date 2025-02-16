
import QRCodeGenerator from "@/components/QRCodeGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-4xl mx-auto py-12 text-center">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">QR Code Sculptor</h1>
          <p className="text-gray-600">
            Create beautiful QR codes for your URLs, contact information, or text
          </p>
        </div>
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default Index;
