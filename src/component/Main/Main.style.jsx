import styled from 'styled-components';
import actionbg from '../../assets/images/actionbg.png';
export const MainStyle = styled.main`
  display: flex;
  min-height: 100vh;

  .leftSec {
    background-image: url(${actionbg});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-height: 100vh;
    overflow: auto;
    .subheadercontianer {
      padding: 0 3%;
    }
  }
`;
