import React, { useEffect, useState } from 'react';
import './Quiz.css';
import quizLogo from '../../assets/quiz/quiz-logo.svg';
import startBtn from '../../assets/quiz/start-btn.svg';
import gsk from '../../assets/quiz/gsk.svg';
import nkdr from '../../assets/quiz/nkdr.svg';
import ppl from '../../assets/quiz/ppl.svg';
import Questions from './Questions/Questions';
import { getGameScore, getQuizScore, quizApi } from '../../apis/axios';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [team, setTeam] = useState([]);
  let navigate = useNavigate()
  useEffect(() => {
    (async function status() {
      console.log('hey');
      const quizScoreReq = await getQuizScore();
      const quizScore = quizScoreReq.data.data;
      if (quizScore) {
        navigate('/home')
      }
    }())
  })
  const startQuiz = () => {
    document.getElementById('quiz').classList.add('start-quiz');
    setStart(true);
    quizApi().then(function (result) {
      setQuestions(result['data']['data']);
      setTeam(result['data']['member_data']);
    });
  };

  return (
    <>
      <div id="quiz" className="quiz">
        <div className="start-screen container-fluid p-0 flex-grow-1">
          <div className="row d-flex flex-grow-1">
            <div className=" col button-col">
              <div className="img-fluid quiz-logo mb-2 mb-md-5">
                <img src={quizLogo} alt="" />
              </div>
              <div id="start-button" onClick={startQuiz} className="img-fluid ">
                <img src={startBtn} alt="" />
              </div>
            </div>
            <div className="col image-col">
              <div className="img-fluid pfizer-logo">
                <img src={gsk} alt="" />
              </div>
              <div className="img-fluid nkdr-logo">
                <img src={nkdr} alt="" />
              </div>
              <div className="img-fluid d-flex flex-row-reverse">
                <img src={ppl} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {start && <Questions questions={questions} memberData={team} />}
    </>
  );
};

export default Quiz;
