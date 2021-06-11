import classNames from 'classnames';

import {applyPrefix} from './formio/utils';


export const getBEMClassName = (base, modifiers=[]) => {
  const prefixedBase = applyPrefix(base);
  const prefixedModifiers = modifiers.map(mod => applyPrefix(`${base}--${mod}`));
  return classNames(prefixedBase, ...prefixedModifiers);
};


const getComponentWithinFieldset = (components, key) => {
  const fieldsetComponents = components.filter(component => component.type === 'fieldset');
  const interiorFieldsetComponents = fieldsetComponents.map(fieldsetComponent => fieldsetComponent.components);
  const flattenedInteriorFielsetComponents = [].concat.apply([], interiorFieldsetComponents);
  return flattenedInteriorFielsetComponents.find(component => component.key === key);
};


export const getComponentLabel = (components, key) => {
  let component = components.find(component => component.key === key);

  if (component === undefined) {
    // If component is not found see if it is within a fieldset
    component = getComponentWithinFieldset(components, key);
  }

  return component ? component.label : '';
};


export const getComponentValue = (inputValue, components, key) => {
    let component = components.find(component => component.key === key);

    if (component === undefined) {
      // If component is not found see if it is within a fieldset
      component = getComponentWithinFieldset(components, key);
    }

    if (component === undefined) {
      // If no component is found then just return an empty string
      // This should not happen but is here to prevent a crash
      return '';
    }

    if (component.type === "checkbox") {
      return inputValue ? 'Ja' : 'Nee';
    } else if (component.type === "select") {
      const obj = component.data.values.find(obj => obj.value === inputValue);
      return obj ? obj.label : '';
    } else if (component.type === "radio") {
      const obj = component.values.find(obj => obj.value === inputValue);
      return obj ? obj.label : '';
    } else if (component.type === "selectboxes") {
      const selectedBoxes = Object.keys(inputValue).filter(key => inputValue[key] === true);
      const selectedObjs = component.values.filter(obj => selectedBoxes.includes(obj.value));
      const selectedLabels = selectedObjs.map(selectedLabel => selectedLabel.label);
      return (
        <ul>
           {selectedLabels.map((label, index) => <li key={index}>{label}</li>)}
        </ul>
      )
    }

    return inputValue;
  };
