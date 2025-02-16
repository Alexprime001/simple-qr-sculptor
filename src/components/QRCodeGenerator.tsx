
import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import {
  InputType,
  DownloadFormat,
  formatQRData,
  downloadQRCode,
  validateInput,
} from "@/utils/qrHelpers";
import InputTypeSelector from "./InputTypeSelector";

const QRCodeGenerator = () => {
  const [inputType, setInputType] = useState<InputType>("url");
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const placeholderText = {
    url: "Enter website URL...",
    email: "Enter email address...",
    phone: "Enter phone number...",
    wifi: "Enter WiFi name...",
    text: "Enter your text...",
  };

  useEffect(() => {
    setIsValid(validateInput(inputType, inputValue));
  }, [inputType, inputValue]);

  const handleDownload = (format: DownloadFormat) => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      downloadQRCode(format, canvas);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <InputTypeSelector selectedType={inputType} onTypeChange={setInputType} />

      <div className="mb-6 animate-fadeIn">
        <input
          type={inputType === "email" ? "email" : "text"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholderText[inputType]}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 bg-white"
        />
      </div>

      <div
        className={`transition-all duration-300 ${
          inputValue ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
        }`}
      >
        {inputValue && (
          <div className="flex flex-col items-center space-y-6 animate-fadeIn">
            <div
              ref={qrRef}
              className="p-4 bg-white rounded-xl shadow-lg"
            >
              <QRCodeCanvas
                value={formatQRData({ type: inputType, value: inputValue })}
                size={200}
                level="H"
                includeMargin
              />
            </div>

            <div className="flex gap-2">
              {["png", "svg", "jpg"].map((format) => (
                <button
                  key={format}
                  onClick={() => handleDownload(format as DownloadFormat)}
                  disabled={!isValid}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 
                    ${
                      isValid
                        ? "bg-primary text-white hover:bg-opacity-90"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  <Download className="w-4 h-4" />
                  <span>{format.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
