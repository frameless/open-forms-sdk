import {Paragraph, Textbox} from '@utrecht/component-library-react';
import {formatISO} from 'date-fns';
import {useFormikContext} from 'formik';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';

import FAIcon from 'components/FAIcon';
import {FloatingWidget, Label, useFloatingWidget} from 'components/forms';
import {getBEMClassName} from 'utils';

import DatePickerCalendar from './DatePickerCalendar';
import {useDateLocaleMeta} from './hooks';
import {PART_PLACEHOLDERS} from './messages';
import {orderByPart, parseDate} from './utils';

const DatePicker = ({name, label, isRequired, onChange, id, disabled, calendarProps, ...extra}) => {
  const intl = useIntl();
  const dateLocaleMeta = useDateLocaleMeta();
  const {getFieldProps} = useFormikContext();
  const [inputValue, setInputValue] = useState('');
  const {
    refs,
    floatingStyles,
    context,
    getFloatingProps,
    getReferenceProps,
    isOpen,
    setIsOpen,
    arrowRef,
  } = useFloatingWidget();

  const calendarIconClassName = getBEMClassName('datepicker-textbox__calendar-toggle');

  // value is always in ISO format in the formik state
  const {value} = getFieldProps(name);
  const currentDate = parseDate(value);

  // valid date -> set the locale-aware formatted value as input state
  const expectedTextboxValue = !isNaN(currentDate)
    ? intl.formatDate(currentDate, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : inputValue;

  if (inputValue !== expectedTextboxValue) {
    setInputValue(expectedTextboxValue);
    return;
  }

  const placeholderParts = orderByPart(
    {
      day: intl.formatMessage(PART_PLACEHOLDERS.day),
      month: intl.formatMessage(PART_PLACEHOLDERS.month),
      year: intl.formatMessage(PART_PLACEHOLDERS.year),
    },
    dateLocaleMeta
  );
  const {onFocus, ...referenceProps} = getReferenceProps();
  return (
    <>
      <Label id={id} isRequired={isRequired} disabled={disabled}>
        {label}
      </Label>
      <Paragraph className={getBEMClassName('datepicker-textbox')}>
        <Textbox
          ref={refs.setReference}
          name={name}
          id={id}
          className="utrecht-textbox--openforms"
          autoComplete="off"
          placeholder={placeholderParts.join(dateLocaleMeta.separator)}
          disabled={disabled}
          {...extra}
          value={inputValue}
          onChange={event => {
            const enteredText = event.target.value;
            setInputValue(enteredText);

            const newDate = parseDate(enteredText, dateLocaleMeta);
            // if we couldn't parse a valid date -> clear the value in the formik state
            // (hitting backspace, deleting the input value completely...)
            if (!newDate) {
              onChange({target: {name, value: ''}});
              return;
            }

            // set the ISO-8601 date in the actual form state
            const enteredDate = formatISO(newDate, {representation: 'date'});
            onChange({target: {name, value: enteredDate}});
          }}
          onFocus={event => {
            onFocus(event);
            extra?.onFocus?.(event);
          }}
          {...referenceProps}
        />
        <FAIcon
          icon="calendar-days"
          extraClassName={calendarIconClassName}
          noAriaHidden
          aria-label={intl.formatMessage({
            description: 'Datepicker: accessible calendar toggle label',
            defaultMessage: 'Toggle calendar',
          })}
          aria-controls={referenceProps['aria-controls']}
          aria-expanded={referenceProps['aria-expanded']}
          aria-haspopup={referenceProps['aria-haspopup']}
          onClick={() => !isOpen && setIsOpen(true)}
        />
      </Paragraph>
      <FloatingWidget
        isOpen={isOpen}
        context={context}
        setFloating={refs.setFloating}
        floatingStyles={floatingStyles}
        getFloatingProps={getFloatingProps}
        arrowRef={arrowRef}
      >
        <DatePickerCalendar
          onCalendarClick={selectedDate => {
            // TODO: shouldn't this return a Date instance? -> question asked in nl-ds Slack
            const truncated = selectedDate.substring(0, 10);
            onChange({target: {name, value: truncated}});
            setIsOpen(false, {keepDismissed: true});
          }}
          currentDate={currentDate}
          {...calendarProps}
        />
      </FloatingWidget>
    </>
  );
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  calendarProps: PropTypes.shape({
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    events: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        emphasis: PropTypes.bool,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
      })
    ),
  }),
};

export default DatePicker;
