import styled from 'styled-components';
import light from '../../assets/images/light.png';
export const SidebarStyle = styled.aside`
  min-width: 300px;
  max-width: 300px;
  background-color: var(--maincolor);
  background-image: url(${light});
  background-size: 100% 100%;
  @media (max-width: 1100px) {
    min-width: 180px;
    max-width: 180px;
  }
  .wecan-container {
    background: linear-gradient(360deg, #362864, transparent);
    padding: 20px 0;
    text-align: center;

    img {
      width: 80%;
      min-width: 100px;
      max-width: 150px;
    }
  }
`;
