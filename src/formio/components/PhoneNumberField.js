import {Formio} from "formiojs";
import {applyPrefix} from "../utils";

const PhoneNumber = Formio.Components.components.phoneNumber;


const PhoneNumberValidator = {
  key: "validate.phoneNumber",
  hasLabel: true,
  message(component) {
    return component.t(component.errorMessage('Invalid Phone Number.  ' +
      'Only numbers, dashes, spaces and optionally a + sign as first character are allowed.'), {
      field: component.errorLabel,
      data: component.data
    });
  },
  check(component, setting, value) {
    if (!value || value === '+') {
      return true;
    }
    let regex = /^\+{0,1}[0-9]{1,}[- 0-9]{0,}$/;
    return regex.test(value);
  }
};


class PhoneNumberField extends PhoneNumber {

    get inputInfo() {
      const info = super.inputInfo;
      // change the default CSS classes
      info.attr.class = applyPrefix('input');
      return info;
    }

    init() {
      super.init();
      this.validator.validators.custom = PhoneNumberValidator;
    }
}

export default PhoneNumberField;
