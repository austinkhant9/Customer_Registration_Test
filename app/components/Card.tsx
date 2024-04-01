import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-auto h-auto shadow-md rounded-md p-6">{children}</div>
  );
};

export default Card;
