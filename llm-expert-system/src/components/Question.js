import React from "react";

const Question = ({ question, onOptionSelect }) => {
  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option) => (
          <li key={option.id} onClick={() => onOptionSelect(option)}>
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
