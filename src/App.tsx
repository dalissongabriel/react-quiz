import React from 'react';
import QuestionCard from './components/QuestionCard';

function App() {

  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(true);

  const TOTAL_QUESTIONS = 10;

  const  startQuiz = async () => {};
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>)=>{};
  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={startQuiz}>Start</button>
      <p className="score">Score: {score}</p>
      <p>Loading questions ...</p>
      <QuestionCard 
        questionNumber={number + 1}
        totalQuestion= {TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number]:undefined}
        callback={checkAnswer}
      />

          
      
    </div>
  );
}

export default App;
