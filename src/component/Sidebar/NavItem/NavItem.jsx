import React, { useState, useEffect } from 'react';
import { NavItemStyle } from './NavItem.style';
import item from '../../../assets/images/item.png';
import itemC from '../../../assets/images/itemC.png';
import logout from '../../../assets/images/logout.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeAuth, activityNumber } from '../../../store/slices/UserSlice';
import { logoutApi } from '../../../apis/axios';

function NavItem() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let itemsData = false;

  if (useSelector((state) => state.user.activeRole) == 'moderator')
    itemsData = useSelector((state) => state.user.role.moderator.navItems.itemsData);
  const [effect, setEffect] = useState(true);

  const [currentActive, setCurrentActive] = useState(0);

  const logoutFun = async () => {
    await logoutApi();
    await dispatch(removeAuth());
    navigate('/');
  };

  const updateData = (currentValue) => {
    //backapi updateData
    dispatch(activityNumber(currentValue)); // add value from api
    setCurrentActive(currentValue);
  };

  useEffect(() => {
    //backapi updateData
    dispatch(activityNumber(0)); // add value from api
    setEffect(false);
  }, []);

  return (
    <NavItemStyle>
      {!itemsData && (
        <li
          className={currentActive == 0 ? 'active' : ''}
          onClick={() => updateData(0)}
        >
          <img src={currentActive == 0 ? itemC : item} />
          <span>Activity Control</span>
        </li>
      )}
      {itemsData &&
        itemsData.map((itemData, index) => (
          <li
            key={index}
            className={currentActive == index ? 'active' : ''}
            onClick={() => updateData(index)}
          >
            <img src={currentActive == index ? itemC : item} />
            <span>{itemData.activity.name}</span>
          </li>
        ))}
      <li onClick={logoutFun}>
        <img src={logout} /> <span>Logout</span>
      </li>
    </NavItemStyle>
  );
}

export default NavItem;
