import React from "react";

// hooks
import { TFormErr } from "../../hooks/useRegistration";

// components
import Button from "@/app/components/Button";
import DropDown from "@/app/components/DropDown";
import InputLayout from "@/app/components/InputLayout";

// types
import { TDistricts, TRegion, TTownship } from "../../types";

// json
import geo from "@/public/local-json/geodata.json";

type TProps<F, E> = {
  formData: F;
  formErr: E;
  /**
   * action
   */
  handleOnChangeEvent: (type: string, value: string | number) => void;
  handleOnClickNext: () => void;
};

const MailingInfo = <
  F extends {
    region: TRegion | null;
    state: TDistricts | null;
    township: TTownship | null;
    address: string;
  },
  E extends Record<TFormErr, string>
>(
  props: TProps<F, E>
) => {
  const { formData, formErr, handleOnChangeEvent, handleOnClickNext } = props;

  return (
    <React.Fragment>
      <div className="grid grid-cols-6 gap-x-4 gap-y-8">
        <div className="col-span-6">
          <InputLayout label="Regions" isRequired={true}>
            <DropDown
              optionList={geo.data}
              optionKey="eng"
              selectedOptionValue={formData.region?.eng || ""}
              searchKey="eng"
              selectedKey="eng"
              selectedValue={formData.region?.eng || ""}
              placeHolderText="Please select regions"
              errMsg={formErr.region}
              /**
               * action
               */
              handleOnSelectOption={(option) =>
                handleOnChangeEvent("region", option)
              }
            />
          </InputLayout>
        </div>
        <div className="col-span-6">
          <InputLayout label="State/Districts" isRequired={true}>
            <DropDown
              optionList={formData.region?.districts || []}
              optionKey="eng"
              selectedOptionValue={formData.state?.eng || ""}
              searchKey="eng"
              selectedKey="eng"
              selectedValue={formData.state?.eng || ""}
              placeHolderText="Please select state/districts"
              errMsg={formErr.state}
              /**
               * action
               */
              handleOnSelectOption={(option) =>
                handleOnChangeEvent("state", option)
              }
            />
          </InputLayout>
        </div>
        <div className="col-span-6">
          <InputLayout label="Township" isRequired={true}>
            <DropDown
              optionList={formData.state?.townships || []}
              optionKey="eng"
              selectedOptionValue={formData.township?.eng || ""}
              searchKey="eng"
              selectedKey="eng"
              selectedValue={formData.township?.eng || ""}
              placeHolderText="Please select township"
              errMsg={formErr.township}
              /**
               * action
               */
              handleOnSelectOption={(option) =>
                handleOnChangeEvent("township", option)
              }
            />
          </InputLayout>
        </div>
        <div className="col-span-6">
          <InputLayout label="Township" isRequired={true}>
            <textarea
              className="border border-gray-200 bg-gray-100 shadow-sm w-full h-auto outline-none focus:ring-1 ring-sky-600 duration-200 rounded-md py-2.5 px-4 text-sm"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleOnChangeEvent("address", e.target.value)
              }
            />
          </InputLayout>
        </div>
        <div className="col-span-6">
          <Button label="Next Step" handleOnClick={handleOnClickNext} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MailingInfo;
