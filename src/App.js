import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StudentCard from 'components/studentCard/studentCard';
import FilterInputField from 'components/filterInputField/filterInputField';

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState([]);
  const [searchTag, setSearchTag] = useState([]);

  //fetch data on first render only, set data and conditionally render a loading message

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
        return <p>An error has occured.</p>;
      }
    };
    fetchData();
  }, []);

  const addTag = (tagValue, idx) => {
    const students = [...data];
    students[idx].tags.push(tagValue);
    setData(students);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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

  // if searchTag is empty, render all students and clear the tag search
  // this is to ensure that the students are reset if a tag is searched and cleared
  const handleTagFilter = (searchTag) => {
    if (searchTag) {
      let filteredStudents = [];
      data.forEach((student) => {
        student.tags.forEach((tag) => {
          tag.includes(searchTag) && filteredStudents.push(student);
        });
      });
      setSearchTag(searchTag);
      setFilters(filteredStudents);
    } else {
      setSearchTag([]);
      setFilters(data);
    }
  };

  // map through the filter list and render students
  return (
    <div className='App'>
      <div className='App--container'>
        <FilterInputField
          filterId='name'
          text='name'
          value={searchName}
          handler={handleNameFilter}
        />
        <FilterInputField
          filterId='tag'
          text='tag'
          value={searchTag}
          handler={handleTagFilter}
        />
        {filters.map((student) => (
          <StudentCard
            key={`s-${data.indexOf(student)}`}
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
