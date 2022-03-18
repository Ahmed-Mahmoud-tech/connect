import styled from 'styled-components';
export const SubHeaderStyle = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  box-shadow: -1px 4px 8px 0px #c5c3c3;
  margin-bottom: 20px;
  .imageContainer {
    max-width: 25%;
    min-width: 180px;
    display: flex;
    align-items: center;
    margin-right: 17px;
  }

  .infoContainer {
    .title {
      color: var(--maincolor);
      font-weight: bold;
      margin: 15px 0;
      align-items: center;
      display: flex;
      img {
        margin-right: 5px;
      }
    }
    p.description {
      font-size: var(--mediumfont);
    }
  }
`;
