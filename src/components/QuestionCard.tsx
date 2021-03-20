import React from 'react'

type Props = {
  question: string,
  answers: string[],
  callback: any,
  userAnswer: any,
  questionNumber: number,
  totalQuestion: number 
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestion
}) => (
  <div>
    <p className="number">Question {questionNumber}/{totalQuestion}</p>
    <p dangerouslySetInnerHTML={{__html: question}}/>
    <div>
      {answers.map(answer => (
        <div>
          <button disabled={!!userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html:answer}}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;