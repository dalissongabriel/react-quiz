import React from 'react'
// Styles
import {ButtonWrapper,Wrapper} from './QuestionCard.styles';
// Types
import {AnswerObject} from '../App';


type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>)=>void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestion: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestion
}) => (
  <Wrapper>    <p className="number">Question {questionNumber}/{totalQuestion}</p>
    <p dangerouslySetInnerHTML={{__html: question}}/>
    <div>
      {answers.map(answer => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}>
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html:answer}}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
  );

export default QuestionCard;