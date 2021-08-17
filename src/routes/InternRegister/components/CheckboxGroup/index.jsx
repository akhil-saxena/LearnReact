import React from 'react';
import { Checkbox } from './checkbox';

export function CheckboxGroup({
  name = '',
  checkboxes = [],
  onChange = () => {}
}) {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState(() => {
    return Array.from(checkboxes, () => false);
  });

  function handleCheckbox(index) {
    setSelectedCheckboxes(() => {
      const nextValues = [...selectedCheckboxes];
      nextValues[index] = !nextValues[index];

      return nextValues;
    });
  }

  React.useEffect(() => {
    const nextValues = checkboxes.filter((_, index) => {
      return selectedCheckboxes[index];
    });
    onChange(name, nextValues);
  }, [selectedCheckboxes]);

  return (
    <div style={{ display: 'flex' }}>
      {checkboxes.map((checkbox, index) => {
        return (
          <Checkbox
            key={checkbox}
            name={name}
            index={index}
            label={checkbox}
            onChange={handleCheckbox}
            checked={selectedCheckboxes[index]}
          />
        );
      })}
    </div>
  );
}
