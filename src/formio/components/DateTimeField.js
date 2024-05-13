import {Formio} from 'react-formio';

import MinMaxDatetimeValidator from 'formio/validators/minMaxDatetimeValidator';

import './FieldWidth.scss';

const DateTimeFormio = Formio.Components.components.datetime;

class DateTimeField extends DateTimeFormio {
  constructor(component, options, data) {
    super(component, options, data);

    if (component.datePicker.minDate || component.datePicker.maxDate) {
      component.validate.datetimeMinMax = true;
    }

    this.validators.push('datetimeMinMax');
    this.validator.validators['datetimeMinMax'] = MinMaxDatetimeValidator;
  }

  get inputInfo() {
    const info = super.inputInfo;
    // apply NLDS CSS classes
    info.attr.class = [
      'utrecht-textbox',
      'utrecht-textbox--html-input',
      'utrecht-textbox--openforms',
      'utrecht-textbox--max-length',
      'utrecht-textbox--openforms-date-time-field-width',
    ].join(' ');
    return info;
  }

  get suffix() {
    // Don't show an icon
    return null;
  }
}

export default DateTimeField;
