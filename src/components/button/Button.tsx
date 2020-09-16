import styled from '@emotion/styled'
import { keyframes } from "@emotion/core";

const ripple = keyframes`
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(20);
  }
`
export const Button = styled.button`
  padding: 16px;
  border-radius: 8px;
  background-color: #97144D;
  font-size: 14px;
  line-height: 18px;
  color: white;
  font-family: 'Lato';
  font-weight: 400;
  border: none;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: #a71451;
  }
  &:focus {
    background-color: #ca125a;
  }
  &:active {
    background-color: #ee1063;
  }
  &::after {
    display: none;
    content: "";
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    width: 10px;
    height: 10px;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    animation: ${ripple} 1s;
    opacity: 0;
  }
  &:focus:not(:active)::after {
    display: block;
  }
`;