import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiSearchAlt } from "react-icons/bi";

type TPropsType = {
  isLoading?: boolean;
  idx?: number;
  optionList: any[];
  optionKey: string;
  selectedOptionValue: string | number;
  searchKey: string;
  selectedKey: string;
  selectedValue: string | number | undefined;
  placeHolderText: string;
  errMsg?: string;
  /**
   * action
   */
  handleOnSelectOption: (option: any, idx?: number) => void;
};

type InputValueType = {
  textValue: string;
  searchValue: string;
};

const DropDown: React.FC<TPropsType> = (props) => {
  const {
    isLoading = false,
    idx = 0,
    optionList,
    optionKey,
    selectedOptionValue,
    searchKey,
    selectedKey,
    selectedValue,
    placeHolderText,
    errMsg = "",
    /**
     * action
     */
    handleOnSelectOption,
  } = props;

  const ref = useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<InputValueType>({
    textValue: "",
    searchValue: "",
  });

  /** Click outside of box - close box - wJR */
  useEffect(() => {
    const checkClickedOutside = (e: TouchEvent | MouseEvent) => {
      if (isOpen && ref.current && !ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkClickedOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="relative h-auto w-full space-y-1"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {isLoading ? (
        <div className="flex w-full justify-center rounded-md border border-default_dark bg-transparent px-4 py-1.5 text-base_light">
          <p className="text-sm text-gray-500"> Loading.... </p>
        </div>
      ) : (
        <div
          className={`flex w-full items-center justify-between rounded-md border border-default_dark bg-gray-100 px-4 py-2.5 lg:cursor-pointer ${
            isOpen && "shadow-sm"
          } duration-200`}
          /**
           * action
           */
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedOptionValue ? (
            <p className=" text-sm truncate">{selectedOptionValue}</p>
          ) : (
            <p className="text-sm text-slate-400 truncate">{placeHolderText}</p>
          )}
          <BiChevronDown
            className={`h-auto w-5 text-gray-600 ${
              isOpen ? "rotate-180" : "rotate-0"
            } duration-200`}
          />
        </div>
      )}

      {isOpen && (
        <ul className="absolute left-0 top-10 z-10 max-h-60 w-full divide-gray-500 overflow-y-auto rounded-md border bg-white text-sm shadow-md">
          <div className="sticky top-0 border-b border-gray-100 bg-gray-100  py-2 shadow-md">
            <BiSearchAlt className="absolute left-2 top-3.5 h-auto w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="text-base placeholder:text-sm h-auto w-full bg-gray-100 px-8 outline-none placeholder:text-slate-400"
              value={inputValue.textValue}
              /**
               * action
               */
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue({
                  ...inputValue,
                  textValue: e.target.value,
                  searchValue: e.target.value.toLowerCase(),
                })
              }
            />
          </div>

          <div className="divide-y">
            {optionList.length ? (
              optionList.map((option, index) => (
                <li
                  key={index}
                  className={`${
                    option[searchKey]
                      .toString()
                      ?.toLowerCase()
                      .startsWith(inputValue.searchValue)
                      ? "block"
                      : "hidden"
                  } ${
                    selectedValue === option[selectedKey]
                      ? "bg-sky-500 text-white"
                      : "bg-inherit hover:bg-gray-100"
                  } px-7 py-2 cursor-pointer`}
                  /**
                   * action
                   */
                  onClick={() => {
                    setIsOpen(false);
                    handleOnSelectOption(option, idx);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <p
                      className={` ${
                        selectedValue === option[selectedKey]
                          ? "text-default"
                          : "text-base_light"
                      }`}
                    >
                      {option[optionKey]}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-xs py-4 text-center text-slate-400">
                No data!
              </p>
            )}
          </div>
        </ul>
      )}
      {errMsg && (
        <p className="text-xs font-medium text-red-600 ml-2"> {errMsg} </p>
      )}
    </div>
  );
};

export default DropDown;
