import React from "react";

// components
import Button from "@/app/components/Button";
import InputBox from "@/app/components/InputBox";
import InputLayout from "@/app/components/InputLayout";

// hooks
import { TFormErr } from "../../hooks/useRegistration";

type TProps<F, E> = {
  formData: F;
  formErr: E;
  /**
   * action
   */
  handleOnChangeEvent: (type: string, value: string | number) => void;
  handleOnClickNext: () => void;
};

const ContactInfo = <
  F extends { phoneNo: string | number; email: string },
  E extends Record<TFormErr, string>
>(
  props: TProps<F, E>
) => {
  const { formData, formErr, handleOnChangeEvent, handleOnClickNext } = props;

  return (
    <React.Fragment>
      <div className="grid grid-cols-6 gap-x-4 gap-y-8">
        <div className="col-span-6">
          <InputLayout label="Mobile Number" isRequired={true}>
            <InputBox
              type="text"
              id="phoneNo"
              name="phoneNo"
              placeHolder="Please enter your phone number"
              value={formData.phoneNo}
              errMsg={formErr.phoneNo}
              /**
               * action
               */
              handleOnChange={({
                target: { name, value },
              }: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChangeEvent(name, value.replace(/[^0-9]/g, ""))
              }
            />
          </InputLayout>
        </div>
        <div className="col-span-6">
          <InputLayout label="Email" isRequired={true}>
            <InputBox
              type="text"
              id="email"
              name="email"
              placeHolder="Please enter your email"
              value={formData.email}
              errMsg={formErr.email}
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
        <div className="col-span-6">
          <Button label="Next Step" handleOnClick={handleOnClickNext} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactInfo;
