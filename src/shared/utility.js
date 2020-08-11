export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
  let isValid = true;
  if(rules.required){
    isValid = (value.trim() !== '' && isValid);
  }
  if(rules.minLenght){
    isValid = (value.length >= rules.minLenght && isValid);
  }
  if(rules.maxLenght){
    isValid = (value.length <= rules.maxLenght && isValid);
  }
  return isValid;
}
