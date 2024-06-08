// for scalability and reuse of code, in case n params have to be checked, we create a combined array of all params to be their existence checked
export function checkEveryParamExistence(...params) {
  return params.every(
    (param) => param !== null && param !== undefined && param !== ""
  );
}
export function checkAtLeastOneParamExist(...params) {
  return params.some((param) => param !== null && param !== undefined);
}
