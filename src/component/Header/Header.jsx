import React from 'react';
import { HeaderStyle } from './Header.style';
import { useSelector } from 'react-redux';

function Header() {
  let userName = useSelector((state) => state.user.username);
  let userPosition = useSelector((state) => state.user.activeRole);

  const firstLetter = (userName) => {
    let nameArray = userName.split(' ');
    let result;
    nameArray.length > 1
      ? (result = nameArray[0].charAt(0) + ' ' + nameArray[1].charAt(0))
      : (result = nameArray[0].charAt(0));
    return result;
  };

  return (
    <HeaderStyle>
      <div className="headerContent">
        <span className="letters">{firstLetter(userName)}</span>
        <span>
          <p className="name">{userName}</p>
          {/* <p className="position">{userPosition}</p> */}
        </span>
      </div>
    </HeaderStyle>
  );
}

export default Header;
