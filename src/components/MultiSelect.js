import React, {useState, useEffect} from 'react';
import Select, { components } from 'react-select';
import Icon from './locked-user-pngrepo-com.png';
import {isEmpty, uniqBy} from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const MultiValueLabel = props => {

  return (
    <>
      <components.MultiValueLabel {...props} >
        {props.children}
      </components.MultiValueLabel>
    </>
  );
};

const MultiValueDropDownIndicator = props => {

  return (
    <>
      <components.DropdownIndicator { ...props }>
      <FontAwesomeIcon icon={faSearch} />
    </components.DropdownIndicator>
    </>
  );
};

function MultiSelect(props) {
  const [ selectOptions, setSelectOptions ] = useState(props.options)
  const [ selectValue, setSelectValue ] = useState(isEmpty(props.defaultValue) ? [] : props.defaultValue);

  const onChange = (val) => {
    setSelectValue(val);
    props.onUnSetReset();
  }
  let spreadValues = isEmpty(props.defaultValue) ? selectValue : [...props.defaultValue, ...selectValue];
  const values = props.isReset ? [] : uniqBy(spreadValues, 'value');
  return (<Select
    closeMenuOnSelect={false}
    components={{
      DropdownIndicator: MultiValueDropDownIndicator,
      MultiValueLabel: MultiValueLabel,
    }}
    styles={{
      multiValueLabel: base => ({
        ...base,
        backgroundColor: '#ab9ce6',
        color: '#4808bf',
        padding: '10px',
      }),
    }}
    defaultValue = {props.defaultValue}
    isMulti
    isClearable={false}
    options={[...selectOptions]}
    searchable
    value={values}
    onChange={(val) => {onChange(val)}}
  />)
  };

MultiSelect.defaultProps = {
  options : [
    { value: 'AL', label: 'MIT' },
    { value: 'AK', label: 'Stanford' },
    { value: 'AS', label: 'IIM' },
  ],
  defaultValue: [
    { value: 'AL', label: 'Alabama' },
  ]
}

export default MultiSelect;