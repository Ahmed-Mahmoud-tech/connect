import styled from 'styled-components';
export const CollapseStyle = styled.div`
  background: white;
  box-shadow: 1px 1px 6px 4px #ededed;
  border: 1px solid #e5e5e5;
  margin-bottom: 10px;
  border-radius: 10px;
  .collapseHeader {
    display: flex;
    align-items: center;
    padding: 10px 5%;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e9;
  }

  button.collapseAction {
    background: unset;
    border: unset;
  }

  .personName {
    flex-grow: 5;
    padding: 15px;
    font-weight: bold;
  }

  img {
    width: 55px;
  }

  .body {
    padding: 10px 5%;
  }
  .bodyItem {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #dfdfdf;
    width: 100%;

    .info {
      width: 100%;
    }
  }
  .bodyItem:last-of-type {
    border-bottom: 0px solid #dfdfdf;
  }
  .close {
    height: 0;
    overflow: hidden;
    padding: 0;
  }
  .title {
    display: flex;
    align-items: center;
    color: var(--maincolor);
    margin-bottom: 10px;

    h4 {
      margin: 0;
    }

    span.triangle {
      color: var(--maincolor);
      font-size: 13px;
      margin-right: 13px;
    }
  }

  ul {
    list-style: none;
    padding-left: 25px;
  }

  li::before {
    content: '';
    width: 5px;
    height: 5px;
    background: var(--maincolor);
    position: absolute;
    top: 11px;
    left: 1px;
    border-radius: 50%;
  }
  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 10px;
  }
  li::after {
    content: '';
    width: 5px;
    height: 5px;
    border: 1px solid var(--maincolor);
    position: absolute;
    top: 11px;
    left: 5px;
    border-radius: 50%;
  }

  .score {
    padding-top: 15px;
    min-width: 160px;
    padding-left: 10px;
    select {
      padding: 2px 10px 5px 5px;
      margin-left: 15px;
    }
    input {
      width: 50px;
      margin-left: 20px;
      text-align: center;
    }
    span {
      font-weight: 500;
    }
  }

  button.submit {
    margin-left: auto;
    display: block;
    border: 0px;
    background: var(--maincolor);
    color: white;
    padding: 5px 30px;
    border-radius: 3px;
    margin-bottom: 30px;
    cursor: pointer;
  }

  button.submit:disabled {
    opacity: 0.5;
  }
`;
