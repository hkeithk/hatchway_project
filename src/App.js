import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StudentCard from 'components/studentCard';

function App() {
  const [data, setData] = useState({ students: [] });
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState('');

  //fetch data on first render only, set data and conditionally render a loading message

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          'https://www.hatchways.io/api/assessment/students'
        );
        let studentsWithTag = [];

        result.students.map((student) => {
          let addTagAttr = student;
          addTagAttr.tags = [];
          studentsWithTag.push(student);
        });

        setData(studentsWithTag);
        setLoading(false);
      } catch (err) {
        return <p>error</p>;
      }
    };
    fetchData();
  }, []);
  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleNameSearch = (e) => {
    setSearchName(e.target.value);
  };

  const handleTagSearch = (e) => {
    setSearchTag(e.target.value);
  };

  return (
    <div className='App'>
      <div className='App--container'>
        <input
          id='name-input'
          type='text'
          className='App--input'
          placeholder='Search by name'
          value={searchName}
          onChange={handleNameSearch}
        />
        <input
          id='tag-input'
          type='text'
          className='App--input'
          placeholder='Search by tags'
          value={searchTag}
          onChange={handleTagSearch}
        />
        {data.students
          .filter((student) => {
            if (
              student.firstName.toLowerCase().includes(searchName) ||
              student.lastName.toLowerCase().includes(searchName)
            ) {
              return true;
            }
          })
          .map((student) => (
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
