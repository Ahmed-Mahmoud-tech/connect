import React from 'react';
import surveyHead from '../../../assets/quiz/survey-head.svg';
import surveyHeadMobile from '../../../assets/quiz/survey-head-mobile.svg';
import submitBtn from '../../../assets/quiz/submit-btn.svg';
import {
  validate_checked_radios,
  disable_radios,
  end_survey,
  answers,
} from './functions';
import { answersApi } from '../../../apis/axios';
import { useNavigate } from 'react-router-dom';

const Questions = (props) => {
  const que = props.questions;
  const team = props.memberData;

  let navigate = useNavigate();
  let memberAnswer = [];

  const submitQuiz = (event) => {
    event.preventDefault();
    if (validate_checked_radios()) {
      memberAnswer = { answers: answers };
      window.scrollTo(0, 0);
      disable_radios();
      answersApi(memberAnswer).then((response) => {
        end_survey();
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      });
    }
  };
  return (
    <>
      <div id="main-wrapper">
        <div id="survey-screen" className="container-fluid display-quiz">
          <div className="container-fluid p-0 survey-head mb-md-5 mb-3">
            <img src={surveyHead} alt="" />
            <div>
              <p>
                <span className="gm">{team.business_unit_name}</span>
                <span className="team">Team</span> <br />
                <span className="aug">{team.team_name}</span>
              </p>
            </div>
            <div className="img-fluid full-header">
              <img src={surveyHead} alt="" />
            </div>
            <div className="img-fluid mobile-header">
              <img src={surveyHeadMobile} alt="" />
            </div>
          </div>

          <div className="container">
            <div className="survey-container">
              {/* <!--Survey form starts--> */}
              <form action="" method="POST" id="survey-form">
                {/* <!--=== Questions will be injected inside this form===--> */}
                <div>
                  {/* <!--=== Question starts===--> */}
                  {que.map((q, key) => {
                    return (
                      <div
                        key={key + 1}
                        id={`question-${key + 1}`}
                        question_id={q['id']}
                        className="row question mb-md-5 mb-3"
                      >
                        {/* <!--Question--> */}
                        <span className="ques_number">{key + 1}</span>
                        <div className="ques_content">
                          {/* <!--Question title--> */}
                          <h4
                            className="ques_title"
                            dangerouslySetInnerHTML={{ __html: q['question'] }}
                          ></h4>
                          <div className="input-group radio-group-required">
                            {q['answers'].map((ans, k) => {
                              return (
                                <div
                                  key={k}
                                  id={ans['id']}
                                  className="form-check col-12"
                                >
                                  <input
                                    className="form-check-input"
                                    name={`radio-name-${key + 1}`}
                                    type="radio"
                                    id={`question-${key + 1}__option-${k + 1}`}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`question-${key + 1}__option-${k + 1}`}
                                    dangerouslySetInnerHTML={{__html:ans['answer']}}
                                  >
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <!--=== Submit button===--> */}
                <button
                  id="submit-btn"
                  onClick={submitQuiz}
                  className="submit-btn"
                  type="submit"
                >
                  <div className="img-fluid">
                    <img src={submitBtn} alt="" />
                  </div>
                </button>

                {/* <!--=== Question ends===--> */}
              </form>
              {/* <!--Survey ends--> */}
            </div>
          </div>
        </div>

        {/* <!--After form submit popup--> */}
        <div id="success-screen" className="container-fluid">
          <div className="inner-box">
            <h4>Quiz Submitted</h4>
            <h2>Successfully</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
