export const VALIDATION_FUNCTIONS = {
  required(val: string, errMsg: string) {
    return val ? "" : errMsg;
  },
  pattern(pattern: RegExp, val: string, errMsg: string) {
    return val && (pattern.test(val) ? "" : errMsg);
  },
};

export function checkValidInput(
  inputName: unknown,
  val: string,
  VAL_LIST: any
) {
  const validations: object = VAL_LIST[inputName as keyof typeof VAL_LIST];
  if (validations) {
    for (const rule of Object.values(validations)) {
      const isInvalid = rule(val);
      if (isInvalid) {
        return isInvalid;
      }
    }
  }
  return null;
}
