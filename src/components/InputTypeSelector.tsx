
import { InputType } from "@/utils/qrHelpers";
import { Link, Mail, Phone, Wifi, Type } from "lucide-react";

interface InputTypeSelectorProps {
  selectedType: InputType;
  onTypeChange: (type: InputType) => void;
}

const InputTypeSelector = ({ selectedType, onTypeChange }: InputTypeSelectorProps) => {
  const types: { type: InputType; icon: React.ReactNode; label: string }[] = [
    { type: "url", icon: <Link className="w-4 h-4" />, label: "URL" },
    { type: "email", icon: <Mail className="w-4 h-4" />, label: "Email" },
    { type: "phone", icon: <Phone className="w-4 h-4" />, label: "Phone" },
    { type: "wifi", icon: <Wifi className="w-4 h-4" />, label: "WiFi" },
    { type: "text", icon: <Type className="w-4 h-4" />, label: "Text" },
  ];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {types.map(({ type, icon, label }) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            selectedType === type
              ? "bg-primary text-white shadow-lg scale-105"
              : "bg-secondary hover:bg-opacity-80"
          }`}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default InputTypeSelector;
