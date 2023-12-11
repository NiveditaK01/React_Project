import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UniversityList = () => {
  // State variables
  const [universities, setUniversities] = useState([]);
  const [country, setCountry] = useState('');
  const [highestCount, setHighestCount] = useState(0);
  const [lowestCount, setLowestCount] = useState(0);

  useEffect(() => {
    axios.get(`http://universities.hipolabs.com/search?name=${country}`)
      .then(response => {
        const data = response.data;

        // Count universities by country
        const counts = data.reduce((acc, uni) => {
          acc[uni.country] = (acc[uni.country] || 0) + 1;
          return acc;
        }, {});

        // the country with the highest and lowest university counts
        const countries = Object.keys(counts);
        setHighestCount(Math.max(...countries.map(c => counts[c])));
        setLowestCount(Math.min(...countries.map(c => counts[c])));

        
        setUniversities(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [country]);

  
  return (
    <div>
      <label>Search by Country: </label>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <p>Total universities in {country}: {universities.length}</p>

      <button onClick={() => alert(`Country with the most universities: ${highestCount}\nCountry with the least universities: ${lowestCount}`)}>
        Show Highest/Lowest
      </button>

      <ul>
        {universities.map(uni => (
          <li key={uni.name}>{uni.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UniversityList;
