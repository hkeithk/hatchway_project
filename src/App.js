import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StudentCard from 'components/studentCard';

function App() {
  const [data, setData] = useState({ students: [] });
  const [loading, setLoading] = useState(false);

  //fetch data on first render only, set data and conditionally render a loading message
  //if data has not been returned

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          'https://www.hatchways.io/api/assessment/students'
        );
        setData(result.data);
        setLoading(false);
      } catch (err) {
        return <p>error</p>;
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App'>
      <div className='App--container'>
        {data.students.map((student) => (
          <StudentCard
            key={`s-${student.firstName}-${student.lastName}`}
            img={student.pic}
            fn={student.firstName}
            ln={student.lastName}
            email={student.email}
            company={student.company}
            skill={student.skill}
            grades={student.grades}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
