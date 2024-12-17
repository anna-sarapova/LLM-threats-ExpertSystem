import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the first question on component mount
    axios.get('/api/questions/1/') // Replace with your actual API endpoint
      .then((response) => {
        setCurrentQuestion(response.data);
        setOptions(response.data.options);
      })
      .catch((error) => console.error('Error fetching question:', error));
  }, []);

  const handleOptionClick = (option) => {
    if (option.threat_id) {
      // If the option leads to a threat, navigate to the threat page
      navigate(`/threat/${option.threat_id}`);
    } else if (option.next_question) {
      // Fetch the next question
      axios.get(`/api/questions/${option.next_question}/`)
        .then((response) => {
          setCurrentQuestion(response.data);
          setOptions(response.data.options);
        })
        .catch((error) => console.error('Error fetching next question:', error));
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{currentQuestion.text}</h1>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <button onClick={() => handleOptionClick(option)}>{option.text}</button>
          </li>
        ))}
      </ul>
      <button onClick={() => window.location.reload()}>Restart Questionnaire</button>
    </div>
  );
};

export default Questionnaire;
