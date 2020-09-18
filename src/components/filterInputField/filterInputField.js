import React from 'react';
import './filterInputField.css';

export const FilterInputField = (props) => {
  const { filterId, text, searchValue, handler } = props;
  return (
    <div>
      <input
        id={`${filterId}-input`}
        type='text'
        className='input--field'
        placeholder={`Search by ${text}`}
        value={searchValue}
        onChange={(e) => handler(e.target.value)}
      />
    </div>
  );
};

export default FilterInputField;
