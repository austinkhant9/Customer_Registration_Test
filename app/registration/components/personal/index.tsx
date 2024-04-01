import React from "react";

// components
import InputLayout from "@/app/components/InputLayout";
import InputBox from "@/app/components/InputBox";
import DropDown from "@/app/components/DropDown";
import Button from "@/app/components/Button";

// hooks
import { TFormData, TFormErr } from "../../hooks/useRegistration";

import nrc from "@/public/local-json/nrc.json";
import geo from "@/public/local-json/geodata.json";

const DEFAULT_NAMING_TYPES = [
  {
    id: 1,
    label: "Mr",
    value: "Mr",
  },
  {
    id: 2,
    label: "Mrs",
    value: "Mrs",
  },
];

const DEFAULT_NRC_TYPE = [
  {
    id: 1,
    label: "(P)",
    value: "(P)",
  },
  {
    id: 2,
    label: "(N)",
    value: "(N)",
  },
];

type TProps<F, E> = {
  formData: F;
  formErr: E;
  /**
   * action
   */
  handleOnChangeEvent: (type: string, value: string | number) => void;
  handleOnClickNext: () => void;
};

const PersonalInfo = <
  F extends {
    type: string;
    fullName: string;
    stateCode: string;
    nrcTownship: string;
    nrcType: string;
    nrcNo: string | number;
  },
  E extends Record<TFormErr, string>
>(
  props: TProps<F, E>
) => {
  const { formData, formErr, handleOnChangeEvent, handleOnClickNext } = props;

  return (
    <React.Fragment>
      <div className="grid grid-cols-6 gap-x-4 gap-y-8">
        <div className="col-span-2">
          <InputLayout label="Type" isRequired={true}>
            <DropDown
              optionList={DEFAULT_NAMING_TYPES}
              optionKey="label"
              selectedOptionValue={formData.type}
              searchKey="label"
              selectedKey="value"
              selectedValue={formData.type}
              placeHolderText="Type of name"
              errMsg={formErr.type}
              /**
               * action
               */
              handleOnSelectOption={(option) =>
                handleOnChangeEvent("type", option.value)
              }
            />
          </InputLayout>
        </div>
        <div className="col-span-4">
          <InputLayout label="Full name" isRequired={true}>
            <InputBox
              type="text"
              id="fullName"
              name="fullName"
              placeHolder="Please enter your name"
              value={formData.fullName}
              errMsg={formErr.fullName}
              /**
               * action
               */
              handleOnChange={({
                target: { name, value },
              }: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChangeEvent(name, value)
              }
            />
          </InputLayout>
        </div>
        <div className="col-span-2">
          <DropDown
            optionList={geo.data.sort(
              (a, b) => Number(a.nrc_code) - Number(b.nrc_code)
            )}
            optionKey="nrc_code"
            selectedOptionValue={formData.stateCode}
            searchKey="nrc_code"
            selectedKey="nrc_code"
            selectedValue={formData.stateCode}
            placeHolderText="State"
            errMsg={formErr.stateCode}
            /**
             * action
             */
            handleOnSelectOption={(option) =>
              handleOnChangeEvent("stateCode", option.nrc_code)
            }
          />
        </div>
        <div className="col-span-2">
          <DropDown
            optionList={nrc.data.filter(
              (nrc) => nrc.nrc_code === formData.stateCode
            )}
            optionKey="name_en"
            selectedOptionValue={formData.nrcTownship}
            searchKey="name_en"
            selectedKey="name_en"
            selectedValue={formData.nrcTownship}
            placeHolderText="Township"
            errMsg={formErr.nrcTownship}
            /**
             * action
             */
            handleOnSelectOption={(option) =>
              handleOnChangeEvent("nrcTownship", option.name_en)
            }
          />
        </div>
        <div className="col-span-2">
          <DropDown
            optionList={DEFAULT_NRC_TYPE}
            optionKey="label"
            selectedOptionValue={formData.nrcType}
            searchKey="label"
            selectedKey="value"
            selectedValue={formData.nrcType}
            placeHolderText="Type"
            errMsg={formErr.nrcType}
            /**
             * action
             */
            handleOnSelectOption={(option) =>
              handleOnChangeEvent("nrcType", option.value)
            }
          />
        </div>
        <div className="col-span-6">
          <InputBox
            type="text"
            id="nrcNo"
            name="nrcNo"
            placeHolder="Number"
            value={formData.nrcNo}
            max={6}
            errMsg={formErr.nrcNo}
            /**
             * action
             */
            handleOnChange={({
              target: { name, value },
            }: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChangeEvent(name, value.replace(/[^0-9]/g, ""))
            }
          />
        </div>
        <div className="col-span-6">
          <Button label="Next Step" handleOnClick={handleOnClickNext} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalInfo;
