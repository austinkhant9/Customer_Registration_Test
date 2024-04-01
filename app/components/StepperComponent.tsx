import React from "react";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";

// icons
import { FaCheck } from "react-icons/fa";

type TProps<S> = {
  stepList: Array<S>;
  activeStepNo: string;
  /**
   * action
   */
  onClickNext?: () => void;
};

export const StepperComponent = <
  S extends { id: number; primaryLabel: string; secondaryLabel: string },
  activeStepNo
>(
  props: TProps<S>
) => {
  const { stepList, activeStepNo } = props;

  const renderStepCircle = ({
    label,
    isActive,
    isCompleted,
  }: {
    label: number | string;
    isActive: boolean;
    isCompleted: boolean;
  }) => {
    if (isCompleted) {
      return (
        <div
          className={`w-12 h-12  rounded-full bg-sky-500 flex justify-center items-center text-white shadow-sm`}
        >
          <FaCheck />
        </div>
      );
    }

    return (
      <div
        className={`w-12 h-12 border-4 rounded-full ${
          isActive
            ? "border-sky-500 text-sky-500"
            : "border-gray-300 text-gray-300"
        }  flex justify-center items-center  shadow-sm`}
      >
        <p className="text-base font-semibold"> {label} </p>
      </div>
    );
  };

  const renderPrimaryLabel = (label: string, isActive: boolean) => {
    return (
      <p
        className={`text-base font-semibold ${
          isActive ? "text-sky-500" : "text-gray-600"
        } `}
      >
        {label}
      </p>
    );
  };

  return (
    <div className="w-full h-auto flex justify-center items-center space-x-5">
      {stepList.map((step: S, index: number) => (
        <React.Fragment key={step.id}>
          {index !== 0 && (
            <div
              className={`w-24 h-1 ${
                Number(activeStepNo) > step.id ||
                Number(activeStepNo) === step.id
                  ? "bg-sky-500"
                  : "bg-gray-300"
              } `}
            />
          )}
          <div className="flex items-center space-x-3">
            {renderStepCircle({
              label: step.id,
              isCompleted: Number(activeStepNo) > step.id,
              isActive: Number(activeStepNo) === step.id,
            })}
            <div>
              {renderPrimaryLabel(
                step.primaryLabel,
                Number(activeStepNo) >= step.id
              )}
              <p className="text-xs font-medium text-gray-400">
                {step.secondaryLabel}
              </p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export const MobileStepperComponent = <
  S extends { id: number; primaryLabel: string; secondaryLabel: string }
>(
  props: TProps<S>
) => {
  const { stepList, activeStepNo, onClickNext } = props;

  return (
    <div className="fixed bottom-0 left-0 w-full h-auto py-3 px-5 bg-slate-50 border-t shadow-md">
      <div className="grid grid-cols-3">
        <div />
        <p className=" text-center text-base font-medium">
          {activeStepNo}/{stepList.length}
        </p>
        <div className="flex justify-end" onClick={onClickNext}>
          <BiRightArrowAlt className="text-2xl" />
        </div>
      </div>
    </div>
  );
};
