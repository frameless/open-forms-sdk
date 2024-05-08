import {Formio} from 'react-formio';

const TextField = Formio.Components.components.textfield;
const HOUSE_NUMBER_REGEX = /^[1-9]\d*(?: ?(?:[a-z]{0,4}|[/-] ?\d+[a-z]{0,4}?))?$/;
const HouseNumberValidator = {
  key: 'validate.houseNumber',
  message(component) {
    return component.t(component.errorMessage('Invalid House Number'), {
      field: component.errorLabel,
      data: component.data,
    });
  },
  check(component, setting, value) {
    if (!value) {
      return true;
    }

    if (value > 99999) {
      return false;
    }

    const isValidHouseNumber = HOUSE_NUMBER_REGEX.test(value);

    return isValidHouseNumber;
  },
};

export default class HouseNumber extends TextField {
  constructor(component, options, data) {
    super(component, options, data);
    this.validator.validators.houseNumber = HouseNumberValidator;
    this.validators.push('houseNumber');
  }

  static schema(...extend) {
    return IBANField.schema(
      {
        type: 'number',
        label: 'house number',
        key: 'house number',
        validateOn: 'blur',
      },
      ...extend
    );
  }

  get inputInfo() {
    const info = super.inputInfo;
    // apply NLDS CSS classes
    info.attr.class = [
      'utrecht-textbox',
      'utrecht-textbox--html-input',
      'utrecht-textbox--openforms',
      'utrecht-textbox--openforms-house-number-width',
      'utrecht-textbox--max-length',
    ].join(' ');
    return info;
  }
}
