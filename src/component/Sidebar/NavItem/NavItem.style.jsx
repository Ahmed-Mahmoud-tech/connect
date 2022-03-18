import styled from "styled-components";
export const NavItemStyle = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 13px 33px;
    display: flex;
    align-items: center;
    color: white;
    font-size: var(--mediumfont);
    cursor: pointer;

    span {
      display: inline-block;
      margin-bottom: 2px;
      margin-left: 20px;
    }
  }

  li.active {
    background-color: white;
    color: var(--maincolor);
  }
`;
