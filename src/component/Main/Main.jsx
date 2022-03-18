import React from 'react';
import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import SubHeader from '../SubHeader/SubHeader.jsx';
import UserAction from '../UserAction/UserAction';
import AdminAction from '../AdminAction/AdminAction';
import CouchAction from '../CouchAction/CouchAction';
import { MainStyle } from './Main.style';
import { useSelector } from 'react-redux';

const Main = () => {
  let activeRole = useSelector((state) => state.user.activeRole);
  const allRoles = {
    admin: <AdminAction />,
    moderator: <CouchAction />,
    member: <UserAction />,
  };

  return (
    <MainStyle>
      <Sidebar />
      <div className="leftSec">
        <div className="upper">
          <Header />
          <div className="subheadercontianer">
            <SubHeader />
            {allRoles[activeRole]}
          </div>
        </div>

        <Footer />
      </div>
    </MainStyle>
  );
};

export default Main;
