import React from "react";

const InputLayout: React.FC<{
  label: string;
  isRequired?: boolean;
  children: React.ReactNode;
}> = ({ label, isRequired = false, children }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </p>
      {children}
    </div>
  );
};

export default InputLayout;
