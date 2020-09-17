import React, { useState } from 'react';
import './tagInputField.css';

export const TagInputField = (props) => {
  const [tagValue, setTagValue] = useState('');
  const { addTag, idx } = props;

  const tagInputChangeHandler = (e) => {
    setTagValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addTag(tagValue, idx);
    setTagValue('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        id='tag-input'
        placeholder='Add a tag'
        className='tag-input'
        value={tagValue}
        onChange={tagInputChangeHandler}
        type='text'
      />
    </form>
  );
};

export default TagInputField;
