import styled ,{ keyframes }from 'styled-components';

export const Button = styled.button`
  font-size:14px;
  line-height: 1;
  color:#FFF;
  background:#1890ff;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 2px;
  margin: ${props => props.margin};
`;
