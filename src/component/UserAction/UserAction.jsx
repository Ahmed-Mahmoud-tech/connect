import React, { useState, useEffect } from 'react';
import { UserActionStyle } from './UserAction.style';
import quiz from '../../assets/images/quiz.png';
import game from '../../assets/images/game.png';
import { useSelector, useDispatch } from 'react-redux';
import { gameSubHeader } from '../../store/slices/UserSlice';
import { getGameScore, getQuizScore } from '../../apis/axios';

function UserAction() {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const reduxText = useSelector(
    (state) => state.user.role.member.action[index].text
  );
  const reduxLink = useSelector(
    (state) => state.user.role.member.action[index].link
  );

  const [text, setText] = useState(reduxText);
  const [link, setLink] = useState(reduxLink);
  const [userStatus, setUserStatus] = useState(0);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    const status = async () => {
      if (!request) {
        setRequest(true);
        const quizScoreReq = await getQuizScore();
        const gameScoreReq = await getGameScore();
        var quizScore = quizScoreReq.data.data;
        var gameScore = gameScoreReq.data.data;
      }
      if (quizScore && !gameScore && userStatus != 1) {
        setUserStatus(1);
      } else if (quizScore && gameScore && userStatus != 2) {
        setUserStatus(2);
      }
    };
    status();

    if (userStatus > 0) {
      setIndex(1);
      dispatch(gameSubHeader());
      setText(reduxText);
      setLink(reduxLink);
    }
  }, [index, userStatus]);

  return (
    <UserActionStyle
      style={userStatus == 2 ? { pointerEvents: 'none', opacity: 0.5 } : null}
    >
      <a href={link}>
        <img src={userStatus == 0 ? quiz : game} />
        <p>{text}</p>
      </a>
    </UserActionStyle>
  );
}
export default UserAction;
