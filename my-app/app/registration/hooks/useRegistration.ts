import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  VALIDATION_FUNCTIONS,
  checkValidInput,
} from "@/app/registration/utils/validation";
import { TDistricts, TRegion, TTownship } from "../types";
import { REGISTRATION_STEP_LIST } from "../constants";
import Dexie from "dexie";

const db = new Dexie("customerTb");
db.version(1).stores({
  customer: "++id,fullName,nrc,phoneNo,email,region, state, township,address",
});

// @ts-ignore
const { customer } = db;

export type TFormData = {
  "1": {
    type: string;
    fullName: string;
    stateCode: string;
    nrcTownship: string;
    nrcType: string;
    nrcNo: string | number;
  };
  "2": {
    phoneNo: string | number;
    email: string;
  };
  "3": {
    region: TRegion | null;
    state: TDistricts | null;
    township: TTownship | null;
    address: string;
  };
};

export type TFormErr =
  | "type"
  | "fullName"
  | "stateCode"
  | "nrcTownship"
  | "nrcType"
  | "nrcNo"
  | "phoneNo"
  | "email"
  | "region"
  | "state"
  | "township"
  | "address";

type THooks = {
  activeStep: string;
  formData: TFormData;
  formErr: Record<TFormErr, string>;
  /**
   * action
   */
  handleOnChangeEvent: (type: string, value: string | number) => void;
  handleOnClickNext: () => void;
};

const VALIDATION_LIST = {
  type: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Type is required!"),
  },
  fullName: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Full name is required!"),
  },
  stateCode: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "State is required!"),
  },
  nrcTownship: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Township is required!"),
  },
  nrcType: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Type is required!"),
  },
  nrcNo: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "NRC number is required!"),
  },
  phoneNo: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Phone number is required!"),
    pattern: (val: string) =>
      VALIDATION_FUNCTIONS.pattern(
        /^09\d{7,11}/,
        val,
        "Please enter a valid phone number(eg. 09123456789)"
      ),
  },
  email: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Email is required!"),
    pattern: (val: string) =>
      VALIDATION_FUNCTIONS.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        val,
        "Please enter a valid email"
      ),
  },
  region: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Region is required!"),
  },
  state: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "State/Districts is required!"),
  },
  township: {
    required: (val: string) =>
      VALIDATION_FUNCTIONS.required(val, "Township is required!"),
  },
};

export function useRegistration(): THooks {
  const router = useRouter();

  const [formData, setFormData] = useState<TFormData>({
    "1": {
      type: "",
      fullName: "",
      stateCode: "",
      nrcTownship: "",
      nrcType: "",
      nrcNo: "",
    },
    "2": {
      phoneNo: "",
      email: "",
    },
    "3": {
      region: null,
      state: null,
      township: null,
      address: "",
    },
  });
  const [formErr, setFormErr] = useState<Record<TFormErr, string>>({
    type: "",
    fullName: "",
    stateCode: "",
    nrcTownship: "",
    nrcType: "",
    nrcNo: "",
    phoneNo: "",
    email: "",
    region: "",
    state: "",
    township: "",
    address: "",
  });
  const [activeStep, setActiveStep] = useState<string>("1");

  const postingData = async () => {
    const { fullName, type, nrcNo, nrcTownship, nrcType, stateCode } =
      formData[1];
    const { phoneNo, email } = formData[2];
    const { region, state, township, address } = formData[3];

    const payload = {
      fullName: `${type} ${fullName}`,
      nrc: `${stateCode}/${nrcTownship}${nrcType}${nrcNo}`,
      phoneNo: phoneNo,
      email: email,
      region: region?.eng || "",
      state: state?.eng || "",
      township: township?.eng || "",
      address: address,
    };

    try {
      const data = await customer.add({ ...payload });
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnChangeEvent = (type: string, value: string | number) => {
    const data = value as string;

    setFormData((prev) => {
      return {
        ...prev,
        [activeStep]: {
          ...prev[activeStep as keyof typeof prev],
          [type]: data,
        },
      };
    });

    const errMsg = checkValidInput(type, data, VALIDATION_LIST);

    setFormErr((prev) => {
      return {
        ...prev,
        [type]: errMsg || "",
      };
    });
  };

  const handleOnClickNext = async () => {
    let isValid: boolean = true;

    const currentData = formData[activeStep as keyof typeof formData];

    for (const key in currentData) {
      const data = currentData[key as keyof typeof currentData] as string;

      const errMsg = checkValidInput(key, data, VALIDATION_LIST);

      if (errMsg) {
        isValid = false;
        setFormErr((prev) => {
          return {
            ...prev,
            [key]: errMsg,
          };
        });
      }
    }

    if (!isValid) return;

    if (Number(activeStep) === REGISTRATION_STEP_LIST.length) {
      await postingData();
    } else {
      setActiveStep(String(Number(activeStep) + 1));
    }
  };

  return {
    activeStep,
    formData,
    formErr,
    /**
     * action
     */
    handleOnChangeEvent,
    handleOnClickNext,
  };
}
