export function checkEveryParamExistence(...params) {
  return params.every(
    (param) => param !== null && param !== undefined && param !== ""
  );
}

export function checkAtLeastOneParamExist(...params) {
  return params.some((param) => param !== null && param !== undefined);
}

export function filterOnlyExistingParams(ojbParams, currentObj) {
  let copyObject = {};
  for (let prop in ojbParams) {
    if (
      ojbParams[prop] !== null &&
      ojbParams[prop] !== undefined &&
      ojbParams[prop] !== ""
    ) {
      copyObject[prop] = ojbParams[prop];
    }
  }

  return { ...currentObj, ...copyObject };
}

export function emailToLowerCased(email) {
  return email.toLowerCase();
}