import React, { useEffect, useState } from 'react';
import { CouchActionStyle } from './CouchAction.style';
import { getActivity, getMemberData, postScore } from '../../apis/axios';
import { useDispatch, useSelector } from 'react-redux';
import { allActivities } from '../../store/slices/UserSlice';
import { toast } from 'react-toastify';

const CouchAction = () => {
  const dispatch = useDispatch();
  let activitiesData = [];
  let currentActivity = useSelector(
    (state) => state.user.role.moderator.apiActivityNumber
  );

  const [allData, setAllData] = useState([]);
  const [effect, setEffect] = useState(true);
  const [updatedActivityData, setUpdatedActivityData] = useState([]);

  let finalMemberData = [];
  const getMemberDataFun = async (activity_id) => {
    // console.log('activity_id', activity_id);
    const memberData = await getMemberData(activity_id);
    const memdata = memberData.data.data;
    for (let x = 0; x < memdata.length; x++) {
      let singleTeam = memdata[x].team_members;
      for (let i = 0; i < singleTeam.length; i++) {
        finalMemberData.push({
          id: singleTeam[i].id,
          memberName: singleTeam[i].name,
          value: singleTeam[i].scores,
        });
      }
    }
    setAllData(finalMemberData);
  };

  useEffect(() => {
    updatedActivityData[currentActivity]
      ? getMemberDataFun(updatedActivityData[currentActivity]?.activity.id)
      : null;
    // setChangeTable({});
  }, [currentActivity, updatedActivityData]);

  useEffect(() => {
    const accessActivity = async () => {
      let activityName = await getActivity();
      activityName = activityName.data.data;
      for (let i = 0; i < activityName.length; i++) {
        let processedItem = {
          activity: {
            name: activityName[i].name,
            id: activityName[i].id,
          },
          columns: [],
        };

        for (let x = 0; x < activityName[i].activity_items.length; x++) {
          processedItem.columns.push({
            name: activityName[i].activity_items[x].name,
            id: activityName[i].activity_items[x].id,
          });
        }

        activitiesData.push(processedItem);
      }
      dispatch(allActivities(activitiesData));
      setUpdatedActivityData(activitiesData);
      // console.log('updatedActivityData', updatedActivityData, allData);
    };
    accessActivity();
    setEffect(false);
  }, []);

  // const [changeTable, setChangeTable] = useState({});

  let change = {};

  {
    allData.map((item, index) => (change[index] = {}));
  }

  const changeInput = (e) => {
    let top = e.target.getAttribute('data-v-index');
    let left = e.target.getAttribute('data-h-index');
    let id = e.target.getAttribute('data-columns');
    let value = e.target.value;
    change[top.toString()][left.toString()] = [id, parseInt(value)];
  };

  const sendDegree = async (rowIndex, e) => {
    let error = 0;
    if (
      Object.keys(change[rowIndex]).length ==
      updatedActivityData[currentActivity]?.columns.length
    ) {
      for (const property in change[rowIndex]) {
        if (
          !(change[rowIndex][property][1] < 6 && change[rowIndex][property][1] > -1)
        ) {
          error++;
          break;
        }
      }
    } else {
      error++;
    }
    if (error > 0) {
      toast.error('all member inputs required with value between 0-5', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'uniqueId',
      });
    } else {
      const send = await postScore({
        activity_id: updatedActivityData[currentActivity].activity.id,
        scores: Object.values(change[rowIndex]),
        member_id: allData[rowIndex].id,
      });

      e.target.disabled = true;
      let arr = e.target.parentNode.parentNode.querySelectorAll('input');
      for (let index = 0; index < arr.length; index++) {
        arr[index].disabled = true;
      }
      // console.log(send);
    }
  };

  return (
    <CouchActionStyle>
      <table>
        <thead>
          <tr>
            <td>Members</td>

            {updatedActivityData[currentActivity]?.columns.map((item) => (
              <td className="cell" key={item.id}>
                {item.name}
              </td>
            ))}

            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {allData.map((data, index) => (
            <tr key={data.id}>
              <td>{data.memberName}</td>

              {updatedActivityData[currentActivity]?.columns.map((data2, index2) => (
                <td key={Math.random()} className="cell">
                  <span className="inputContainer">
                    {data.value.length > 0 ? (
                      <>
                        <input
                          type="text"
                          value={data.value[index2]?.score_without_factor}
                          disabled
                        />
                      </>
                    ) : (
                      <input
                        maxLength="1"
                        type="text"
                        data-columns={data2.id}
                        data-h-index={index2}
                        data-v-index={index}
                        onChange={(e) => {
                          changeInput(e);
                        }}
                      />
                    )}
                  </span>
                  <span>/ 5</span>
                </td>
              ))}
              <td>
                <button
                  disabled={data.value.length > 0 ? true : false}
                  onClick={(e) => sendDegree(index, e)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CouchActionStyle>
  );
};

export default CouchAction;
