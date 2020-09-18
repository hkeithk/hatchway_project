import React, { useState } from 'react';
import './studentCard.css';
import TagInputField from 'components/tagInputField/tagInputField';
import Tag from 'components/tag/tag';

export const StudentCard = (props) => {
  const {
    img,
    fn,
    ln,
    email,
    company,
    skill,
    grades,
    addTag,
    idx,
    tags,
  } = props;
  const [open, setOpen] = useState(false);

  const average = grades.reduce(function (acc, next) {
    return Number(acc) + Number(next);
  });

  const allGrades = [];
  for (let i = 1; i < grades.length + 1; i += 1) {
    allGrades.push(
      <p key={`idx-${grades[i - 1] * Math.random()}`}>
        Test {i}: {grades[i - 1]}%
      </p>
    );
  }

  const allTags = [];
  tags.forEach((tag, val) => {
    allTags.push(<Tag tag={tag} key={`tag-${val.toString()}`} />);
  });

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='card--outer'>
      <img className='card--img-normal' src={img} alt='profile' />
      <div className='card--inner-text'>
        <h1 className='h1--nomargin'>
          {fn.toUpperCase()} {ln.toUpperCase()}
        </h1>
        <p>
          Email: {email} <br></br> Company: {company} <br></br> Skill: {skill}{' '}
          <br></br> Average: {average / 8}%{' '}
        </p>
        {open ? (
          <>
            {allGrades}
            <div className='tag--container-row'>{allTags} &nbsp;</div>
            <TagInputField addTag={addTag} idx={idx} />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className='button--container-closed'>
        <button className='expand-btn' onClick={handleClick}>
          {open ? '-' : '+'}
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
