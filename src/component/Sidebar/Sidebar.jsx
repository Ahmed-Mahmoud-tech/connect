import React from "react";
import weCan from "../../assets/images/wecan.png";
import NavItem from "./NavItem/NavItem";
import { SidebarStyle } from "./Sidebar.style";

function Sidebar() {
  return (
    <SidebarStyle className="sidebar">
      <div className="wecan-container">
        <img src={weCan} />
      </div>
      <div className="links-container">
        <NavItem />
      </div>
    </SidebarStyle>
  );
}

export default Sidebar;
