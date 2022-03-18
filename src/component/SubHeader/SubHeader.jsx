import React from "react";
import { SubHeaderStyle } from "./SubHeader.style";

import { useSelector } from "react-redux";

const SubHeader = () => {
  let { image, titleIcon, title, description } = useSelector(
    (state) => state.user.role[state.user.activeRole].subHeader
  );

  return (
    <SubHeaderStyle>
      {image && (
        <div className="imageContainer">
          <img src={image} />
        </div>
      )}
      <div className="infoContainer">
        <h3 className="title">
          {titleIcon && <img src={titleIcon} />}
          {title}
        </h3>
        <p className="description">{description}</p>
      </div>
    </SubHeaderStyle>
  );
};

export default SubHeader;
