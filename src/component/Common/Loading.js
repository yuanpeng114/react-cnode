import React from 'react';
import styled ,{ keyframes }from 'styled-components';

const Loading = () => (
  <LoadWrap>
    <LoadBar></LoadBar>
    <LoadBar></LoadBar>
    <LoadBar></LoadBar>
  </LoadWrap>
)
const ImgPreLoad = () => (
  <ImgLoad></ImgLoad>
)

const ImgLoad = styled.div`
    width: 30px;
    height: 30px;
    background:red;
`;

const bouncedelay = keyframes`
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
`
const LoadWrap = styled.div`
    width: 70px;
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    text-align: center;
`;
const LoadBar = styled.div`
    width: 18px;
    height: 18px;
    background-color: #333;
    border-radius: 100%;
    display: inline-block;
    animation: ${bouncedelay} 1.4s infinite ease-in-out both;
    &:nth-child(2){
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
    &:first-child{
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
`
export { Loading as default , ImgPreLoad}
