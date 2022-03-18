import React, { useState, useEffect } from 'react';
import { AdminActionStyle } from './AdminAction.style';
import Modal from '../Modal/Modal';
import { adminStatus, changeStatus } from '../../apis/axios';
import on from '../../assets/images/on.png';
import off from '../../assets/images/off.png';

function AdminAction() {
  const [popUpState, setPopUpState] = useState(false);
  const [effect, setEffect] = useState(true);
  const activePopUp = {
    status: true,
    title: 'Deactivate Activities',
    message: 'Are you sure you want to deactivate activities',
    titleColor: 'red',

    accept: async () => {
      await changeStatus({ status: 'inactive' });
      setPopUpState(false);
      setCurrentData(deActivePopUp);
    },
  };

  const deActivePopUp = {
    status: false,

    title: 'Activate Activities',
    message: 'Are you sure you want to activate activities',
    titleColor: 'green',

    accept: async () => {
      await changeStatus({ status: 'active' });
      setPopUpState(false);
      setCurrentData(activePopUp);
    },
  };

  const [currentData, setCurrentData] = useState(activePopUp);

  useEffect(() => {
    const getStatus = async () => {
      let isActive = await adminStatus();
      if (isActive.data.data.members_status == 'active') {
        setCurrentData(activePopUp);
      } else {
        setCurrentData(deActivePopUp);
      }
    };
    getStatus();
    setEffect(false);
  }, []);

  return (
    <AdminActionStyle>
      <img src={currentData.status ? off : on} onClick={() => setPopUpState(true)} />
      {popUpState && (
        <Modal
          title={currentData.title}
          message={currentData.message}
          titleColor={currentData.titleColor}
          accept={currentData.accept}
          cancel={setPopUpState}
        />
      )}
    </AdminActionStyle>
  );
}

export default AdminAction;
