import styled from 'styled-components';
export const CouchActionStyle = styled.div`
  margin: 20px 0 0;
  max-width: calc(100vw - 180px);
  overflow: auto;
  padding: 10px;
  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    font-size: var(--mediumfont);
    tr {
      height: 43px;
      font-weight: 500;

      input[type='text'] {
        max-width: 20px;
        text-align: center;
        margin-right: 5px;
      }

      button:disabled {
        background: #4c3e7e9c;
      }
      button {
        background: #58488e;
        color: white;
        padding: 3px 15px;
        border-radius: 3px;
      }

      input[type='text']:disabled {
        color: darkgrey;
      }
    }
  }
  thead {
    background-color: var(--maincolor);
    color: white;
    font-weight: 100;
  }
  tr:nth-child(even) {
    background-color: #58488e1a;
  }
  tbody td:not(:last-child) {
    border-right: 1px solid #e3e3e3;
  }

  .cell {
    min-width: 100px;
    max-width: 100px;
  }

  td:first-child {
    min-width: 150px;
    max-width: 150px;
  }
`;

export const CollapseStyle = styled.div`
  transition: 2s;
`;
