import React from 'react';
import './tag.css';

export const Tag = (props) => {
  const { tag } = props;

  return <p className='tag--container-gray'>{tag}</p>;
};

export default Tag;
