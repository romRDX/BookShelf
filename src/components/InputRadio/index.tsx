import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

type OptionsObject = Array<any>;

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  options: OptionsObject[];
  checkedValue: string;
}

const RadioInput: React.FC<IInputProps> = ({ name, options, checkedValue, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container>
      {options.map(option => (
        <div key={option[0]}>
          <label htmlFor={option[0]} >
            {option[1]}
            <input
              ref={ref => inputRefs.current.push(ref as HTMLInputElement)}
              value={option[0]}
              type="radio"
              name={name}
              id={option[0]}
              defaultChecked={ option[0] === checkedValue }
              {...rest}
            />
          </label>
        </div>
      ))}
    </Container>
  );
};

export default RadioInput;
