import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionnairePage = () => {
  const [questionHistory, setQuestionHistory] = useState([]); // Array to store questions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the starting question on load
  useEffect(() => {
    fetchStartingQuestion();
  }, []);

  const fetchStartingQuestion = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/start/")
      .then((response) => {
        setQuestionHistory([{ ...response.data, options: response.data.options || [] }]);
        setError(null);
      })
      .catch((err) => {
        setError("Error fetching the starting question.");
      })
      .finally(() => setLoading(false));
  };

  const handleOptionClick = (nextQuestionId) => {
    if (!nextQuestionId) return;

    // Check if the question already exists in history
    if (questionHistory.some((q) => q.id === nextQuestionId)) {
      console.log("Question already exists in history.");
      return;
    }

    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/questions/${nextQuestionId}/`)
      .then((response) => {
        console.log("API Response:", response.data); // Debug the response
        setQuestionHistory((prevHistory) => [
          ...prevHistory,
          { ...response.data, options: response.data.options || [] },
        ]);
        setError(null);
      })
      .catch((err) => {
        setError("Error fetching the next question.");
      })
      .finally(() => setLoading(false));
  };

  const handleRestart = () => {
    setQuestionHistory([]); // Clear the history
    // setError(null);
    // fetchStartingQuestion();
    setError(null);
    setLoading(true);
    fetchStartingQuestion();
  };

  if (loading && questionHistory.length === 0) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h1>Interactive Questionnaire</h1>

      {questionHistory.map((question, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <p>
            <strong>Question {index + 1}:</strong> {question.text}
          </p>

          {question.is_final ? (
            <div>
              <h2>Threat Details:</h2>
              {question.answer ? (
                <>
                  <p><strong>Name:</strong> {question.answer.name}</p>
                  <p><strong>Description:</strong> {question.answer.description}</p>
                  <p><strong>Impact:</strong> {question.answer.impact}</p>
                  <p><strong>Mitigation:</strong> {question.answer.mitigation}</p>
                </>
              ) : (
                <p>No threat details available.</p>
              )}
              <button onClick={handleRestart} style={{ marginTop: "10px" }}>
                Restart Questionnaire
              </button>
            </div>
          ) : (
            <ul>
              {question.options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleOptionClick(option.next_question_id)}
                  style={{ cursor: "pointer", margin: "5px 0" }}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          )}

        </div>
      ))}
    </div>
  );
};

export default QuestionnairePage;
