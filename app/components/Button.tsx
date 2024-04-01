import React from "react";

type TProps = {
  label: string;
  handleOnClick: () => void;
};

const Button: React.FC<TProps> = (props) => {
  const { label, handleOnClick } = props;

  return (
    <button
      className="rounded-full text-sm text-white bg-sky-500 w-full py-2.5"
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
};

export default Button;
