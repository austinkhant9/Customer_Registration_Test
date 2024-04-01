"use client";

import React from "react";

// hooks
import { useRegistration } from "./hooks/useRegistration";

// constants
import { REGISTRATION_STEP_LIST } from "./constants";

//components
import {
  StepperComponent,
  MobileStepperComponent,
} from "../components/StepperComponent";
import PersonalInfo from "./components/personal";
import ContactInfo from "./components/contact";
import MailingInfo from "./components/mailing";

const UserRegistration = () => {
  const {
    formData,
    formErr,
    activeStep,
    /**
     * action
     */
    handleOnChangeEvent,
    handleOnClickNext,
  } = useRegistration();

  const getCurrentComponent = () => {
    switch (activeStep) {
      case "1":
        return (
          <PersonalInfo
            formData={formData["1"]}
            formErr={formErr}
            /**
             * action
             */
            handleOnChangeEvent={handleOnChangeEvent}
            handleOnClickNext={handleOnClickNext}
          />
        );
      case "2":
        return (
          <ContactInfo
            formData={formData["2"]}
            formErr={formErr}
            /**
             * action
             */
            handleOnChangeEvent={handleOnChangeEvent}
            handleOnClickNext={handleOnClickNext}
          />
        );
      case "3":
        return (
          <MailingInfo
            formData={formData["3"]}
            formErr={formErr}
            /**
             * action
             */
            handleOnChangeEvent={handleOnChangeEvent}
            handleOnClickNext={handleOnClickNext}
          />
        );

      default:
        return (
          <PersonalInfo
            formData={formData["1"]}
            formErr={formErr}
            /**
             * action
             */
            handleOnChangeEvent={handleOnChangeEvent}
            handleOnClickNext={handleOnClickNext}
          />
        );
    }
  };

  return (
    <div className="w-auto space-y-8 px-2 md:px-5 lg:px-10 py-4 md:py-8 lg:py-10">
      <div className="hidden lg:block">
        <StepperComponent
          stepList={REGISTRATION_STEP_LIST}
          activeStepNo={activeStep}
        />
      </div>
      <div className="block lg:hidden">
        <MobileStepperComponent
          stepList={REGISTRATION_STEP_LIST}
          activeStepNo={activeStep}
          onClickNext={handleOnClickNext}
        />
      </div>
      <div className="w-full block md:flex md:justify-center h-auto ">
        <div className="w-full md:w-3/4 lg:w-2/5 md:shadow-md md:rounded-md md:p-6 md:border">
          {getCurrentComponent()}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
