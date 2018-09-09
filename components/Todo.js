import styled from "styled-components";

export const TodoContainer = styled.div`
  width: 400px;
`;

export const TodoFooter = styled.footer`
  margin: 20px;
`;

export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const TodoInput = styled.input`
  height: 40px;
  width: 100%;
  font-size: 18px;
  padding: 0 10px;
  border: 1px dashed red;
  outline: 0;
  ::placeholder {
    font-weight: 300;
    color: #969696;
    font-style: italic;
  }
`;

export const TodoItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #ff6262;
  margin: 3px;
`;

export const TodoCheckbox = styled.input`
  cursor: pointer;
  margin: 16px;
`;

export const TodoItemLabel = styled.label`
  cursor: pointer;
  margin-left: 8px;
  line-height: 1;
`;

export const TodoItemDelete = styled.span`
  position: absolute;
  right: 16px;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
