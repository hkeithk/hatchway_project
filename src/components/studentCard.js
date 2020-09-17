import React from 'react';
import './studentCard.css';

export const StudentCard = (props) => {
  const { img, fn, ln, email, company, skill, grades } = props;

  //calculate the sum total
  const average = grades.reduce(function (acc, next) {
    return Number(acc) + Number(next);
  });

  return (
    <div class='card--outer'>
      <img class='card--img-normal' src={img} alt='profile' />
      <div class='card--inner-text'>
        <h1>
          {fn.toUpperCase()} {ln.toUpperCase()}
        </h1>
        <p>
          Email: {email} <br></br> Company: {company} <br></br> Skill: {skill}{' '}
          <br></br> Average: {average / 8}%{' '}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
