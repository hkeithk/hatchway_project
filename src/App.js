import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StudentCard from 'components/studentCard/studentCard';

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState('');

  //fetch data on first render only, set data and conditionally render a loading message
  //if data has not been returned

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          'https://www.hatchways.io/api/assessment/students'
        );

        const studentsWithTags = [];

        result.data.students.forEach((student) => {
          let taggedStudent = student;
          taggedStudent.tags = [];
          studentsWithTags.push(taggedStudent);
        });
        setData(studentsWithTags);
        setFilters(studentsWithTags);
        setLoading(false);
      } catch (err) {
        return <p>error</p>;
      }
    };
    fetchData();
  }, []);

  //create an addtag function
  //pass addtag function into child component
  //create an addtag component that will use addTag function

  //might be tricky because I had to modify the index values, so double check for errors here
  const addTag = (tagValue, idx) => {
    const students = [...data];
    students[idx].tags.push(tagValue);
    setData(students);
    console.log(data);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // const handleNameSearch = (e) => {
  //   setSearchName(e.target.value);
  // };

  const handleTagSearch = (e) => {
    setSearchTag(e.target.value);
  };

  const handleNameFilter = (searchName) => {
    let filteredStudents = [];
    data.forEach((student) => {
      let fullName = `${student.firstName} ${student.lastName}`;
      fullName.toLowerCase().includes(searchName) &&
        filteredStudents.push(student);
    });
    setSearchName(searchName);
    setFilters(filteredStudents);
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
          // onChange={handleNameSearch}
          onChange={(e) => handleNameFilter(e.target.value.toLowerCase())}
        />
        <input
          id='tag-input'
          type='text'
          className='App--input'
          placeholder='Search by tags'
          value={searchTag}
          onChange={handleTagSearch}
        />
        {/* {data
          .filter((student) => {
            if (
              student.firstName.toLowerCase().includes(searchName) ||
              student.lastName.toLowerCase().includes(searchName)
            ) {
              return true;
            }
          }) */}
        {filters.map((student) => (
          <StudentCard
            key={`s-${student.firstName}-${student.lastName}`}
            img={student.pic}
            fn={student.firstName}
            ln={student.lastName}
            email={student.email}
            company={student.company}
            skill={student.skill}
            grades={student.grades}
            addTag={addTag}
            tags={student.tags}
            idx={data.indexOf(student)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
