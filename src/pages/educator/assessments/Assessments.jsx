import React, { useState } from "react";

const Assessments = () => {
  const [questions, setQuestions] = useState([
    { text: "", options: ["", ""], correct: [false, false] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", ""], correct: [false, false] },
    ]);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    newQuestions[questionIndex].correct.push(false); // Initially, new options are not correct
    setQuestions(newQuestions);
  };

  const handleTextChange = (questionIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].text = text;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(newQuestions);
  };

  const handleCorrectChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correct[optionIndex] =
      !newQuestions[questionIndex].correct[optionIndex];
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    newQuestions[questionIndex].correct.splice(optionIndex, 1); // Remove the corresponding correct value
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  };

  return (
    <div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            placeholder="Question"
            value={question.text}
            onChange={(e) => handleTextChange(questionIndex, e.target.value)}
          />
          <button onClick={() => handleAddOption(questionIndex)}>
            Add Option
          </button>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder="Option"
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
              />
              <input
                type="checkbox"
                checked={question.correct[optionIndex]}
                onChange={() => handleCorrectChange(questionIndex, optionIndex)}
              />
              <button
                onClick={() => handleRemoveOption(questionIndex, optionIndex)}
              >
                Remove Option
              </button>
            </div>
          ))}
          <button onClick={() => handleRemoveQuestion(questionIndex)}>
            Remove Question
          </button>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add New Question</button>
    </div>
  );
};

export default Assessments;
