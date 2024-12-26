import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionnairePage = () => {
  const [questionHistory, setQuestionHistory] = useState([]); // Store questions
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
      .catch(() => {
        setError("Error fetching the starting question.");
      })
      .finally(() => setLoading(false));
  };

  const handleOptionClick = (option) => {
    if (option.is_final) {
        if (!option.threat_id) {
            console.error("No threat ID provided for final option.");
            setError("This option does not lead to a valid threat.");
            return;
        }
        fetchThreatDetails(option.threat_id);
        return;
    }

    if (!option.next_question_id) {
        console.error("No next question ID provided for this option.");
        setError("This option does not lead to another question.");
        return;
    }

    if (questionHistory.some((q) => q.id === option.next_question_id)) {
        console.log("Question already exists in history.");
        return;
    }

    setLoading(true);
    axios
        .get(`http://127.0.0.1:8000/api/questions/${option.next_question_id}/`)
        .then((response) => {
            setQuestionHistory((prevHistory) => [
                ...prevHistory,
                { ...response.data, options: response.data.options || [] },
            ]);
            setError(null);
        })
        .catch((err) => {
            setError("Error fetching the next question.");
            console.error(err);
        })
        .finally(() => setLoading(false));
};

  const fetchThreatDetails = async (threatId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/threats/${threatId}/`);
      const threatDetails = response.data;

      setQuestionHistory((prevHistory) => [
        ...prevHistory,
        {
          id: `threat-${threatId}`,
          text: "Threat Details",
          is_final: true,
          answer: threatDetails,
          options: [],
        },
      ]);
      setError(null);
    } catch (error) {
      console.error("Error fetching threat details:", error);
      setError("Error fetching threat details.");
    }
  };

  const handleRestart = () => {
    setQuestionHistory([]);
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
          {question.is_final ? (
            <div>
              <h2>Threat Details:</h2>
              {question.answer ? (
                <>
                  <p><strong>Name:</strong> {question.answer.name}</p>
                  <p><strong>Description:</strong> {question.answer.description}</p>
                  <p><strong>Impact:</strong> {question.answer.impact}</p>
                  <p><strong>Mitigation strategy:</strong> {question.answer.mitigation}</p>
                </>
              ) : (
                <p>No threat details available.</p>
              )}
              <button onClick={handleRestart} style={{ marginTop: "10px" }}>
                Restart Questionnaire
              </button>
            </div>
          ) : (
            <>
              <p>
                <strong>Question {index + 1}:</strong> {question.text}
              </p>
              <ul>
                {question.options.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => index === questionHistory.length - 1 && handleOptionClick(option)} // Disable clicks for previous questions
                    style={{
                      cursor: index === questionHistory.length - 1 ? "pointer" : "default", // Indicate unclickable options
                      margin: "5px 0",
                    }}
                  >
                    {option.text}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionnairePage;
