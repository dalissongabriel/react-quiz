import React from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestion, Difficulty, QuestionState } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestion(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User Answer
      const answer = e.currentTarget.value;
      // Check Answer against corret answer
      const correct = questions[number].correct_answer === answer;
      // Add Score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save Answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle/>
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading questions ...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNumber={number + 1}
            totalQuestion={TOTAL_QUESTIONS}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
