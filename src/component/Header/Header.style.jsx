import styled from 'styled-components';
export const HeaderStyle = styled.header`
  background-color: white;
  box-shadow: 0 0 11px #d6d5db;
  margin-bottom: 22px;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  .headerContent {
    display: flex;
    color: var(--maincolor);
    margin-right: 15px;
    .letters {
      background-color: var(--maincolor);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--mediumfont);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      text-transform: uppercase;
    }
    p.name {
      font-weight: bold;
      line-height: 13px;
      margin-top: 12px;
    }
  }
`;
