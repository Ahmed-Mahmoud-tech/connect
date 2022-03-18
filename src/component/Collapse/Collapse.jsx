import React, { useEffect, useRef, useState } from 'react';
import person from '../../assets/images/person.png';
import arrow from '../../assets/images/arrow.png';
import { toast } from 'react-toastify';
import { CollapseStyle } from './Collapse.style';
import Modal from '../Modal/Modal';
import { postScore } from '../../apis/axios';

const Collapse = ({ name, data, item, activity_id, member_id }) => {
  const [effect, setEffect] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const activityItem = useRef();
  const [popUpState, setPopUpState] = useState(false);
  const [beforeSend, setBeforeSend] = useState(false);
  let postData;
  const submitAction = () => {
    let arr = activityItem.current.querySelectorAll('select');
    let error = 0;
    postData = {
      activity_id: activity_id,
      scores: [],
      member_id: member_id,
    };
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].value == 'none') {
        toast.error('All member inputs is required', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'uniqueId',
        });
        error++;
        break;
      } else {
        postData.scores.push([
          arr[index].getAttribute('data-activityid'),
          arr[index].value,
        ]);
      }
    }
    if (error == 0) {
      setBeforeSend(postData);
      setPopUpState(!popUpState);
    }
  };

  const sendData = async () => {
    const send = await postScore(beforeSend);
    activityItem.current.style.opacity = 0.5;
    activityItem.current.style.pointerEvents = 'none';
    setPopUpState(!popUpState);
  };

  useEffect(() => {
    setEffect(false);
  }, []);

  return (
    <CollapseStyle>
      <div className="collapseHeader">
        <img className="personImage" src={person} />
        <h5 className="personName">{name}</h5>
        <button className="collapseAction" onClick={() => setCollapse(!collapse)}>
          <img
            className="arrowImage"
            src={arrow}
            style={!collapse ? { transform: 'rotate(180deg)' } : null}
          />
        </button>
      </div>
      <div className={collapse ? 'body' : 'body close'} ref={activityItem}>
        {item &&
          item.map((data2, index2) => (
            <div className="bodyItem" key={data2.name + index2}>
              <div className="info">
                <div className="title">
                  <span className="triangle">▶</span>
                  <h4>{data2.name}</h4>
                </div>
                <ul>
                  {data2.description.map((descriptionItem, index) => (
                    <li key={Math.random()}>
                      {descriptionItem.map((descriptionItemLine, index2) => {
                        if (descriptionItemLine.length > 2) {
                          return <p key={index2}>- {descriptionItemLine}</p>;
                        }
                      })}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="score">
                <span>Degree</span>
                {data?.length > 0 ? (
                  activity_id == 1 ? (
                    <input type="text" value={data[index2]?.score + '%'} disabled />
                  ) : (
                    <input type="text" value={data[index2]?.score} disabled />
                  )
                ) : activity_id == 1 ? (
                  <select data-activityid={data2.id} defaultValue="none">
                    <option value="none" disabled>
                      --%
                    </option>

                    {data2.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}%
                      </option>
                    ))}
                  </select>
                ) : (
                  <select data-activityid={data2.id} defaultValue="none">
                    <option value="none" disabled>
                      ....
                    </option>

                    {data2.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}

        <button
          className="submit"
          disabled={data.length > 0 ? true : false}
          onClick={submitAction}
        >
          Submit
        </button>
      </div>
      {popUpState && (
        <Modal
          title="Submit Score?"
          message="This action cannot be undone, are you sure want to submit this score?"
          titleColor="black"
          accept={sendData}
          cancel={setPopUpState}
        />
      )}
    </CollapseStyle>
  );
};

export default Collapse;
