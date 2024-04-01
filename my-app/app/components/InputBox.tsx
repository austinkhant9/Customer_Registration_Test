import React from "react";

type TProps = {
  type: "text" | "number" | "tel";
  id: string;
  name: string;
  value: string | number;
  placeHolder?: string;
  errMsg?: string;
  max?: number;
  pattern?: string;
  /**
   * action
   */
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox: React.FC<TProps> = (props) => {
  const {
    type,
    id,
    name,
    value,
    placeHolder = "",
    errMsg = "",
    max,
    pattern,
    /**
     * action
     */
    handleOnChange,
  } = props;

  return (
    <div className="space-y-1">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        maxLength={max}
        pattern={pattern}
        placeholder={placeHolder}
        className="border w-full h-auto rounded-md bg-gray-100 py-2 px-3 placeholder:text-sm text-base text-gray-800 outline-none shadow-sm focus:ring-1 focus:shadow-md ring-sky-500 duration-200"
        /**
         * action
         */
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
      />
      {errMsg && (
        <p className="text-xs font-medium text-red-600 ml-2 ">{errMsg}</p>
      )}
    </div>
  );
};

export default InputBox;
