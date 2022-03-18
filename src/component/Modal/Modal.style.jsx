import styled from 'styled-components';
export const ModalStyle = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background: #56468d59;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    background: white;
    padding: 40px 80px;
    border-radius: 6px;
    text-align: center;
  }

  button {
    padding: 6px;
    width: 120px;
    border-radius: 3px;
    margin: 10px;
    text-align: center;
    font-weight: 500;
    cursor: pointer;
  }

  button.accept {
    background: var(--maincolor);
    border: 0;
    color: white;
  }

  button.cancel {
    background: unset;
    color: #e32d2d;
    border: 1px solid #e32d2d;
  }

  h5 {
    margin: 15px 0;
  }
`;
