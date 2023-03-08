import React from "react";
import styled, { keyframes, css } from "styled-components";

const icons = [
  {
    id: 1,
    imgUrl: "/images/stage/instagram.svg",
  },
  {
    id: 2,
    imgUrl: "/images/stage/twitter.svg",
  },
  {
    id: 3,
    imgUrl: "/images/stage/facebook.svg",
  },
  {
    id: 4,
    imgUrl: "/images/stage/kakao.svg",
  },
  {
    id: 5,
    imgUrl: "/images/stage/line.svg",
  },
];

const ArtistModal = ({ children, data, visible, onClose }) => {
  if (!visible) {
    return null;
  }

  const text = window.location.href;
  console.log(data);

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <Close>
          <CloseButton type="button" onClick={onClose}></CloseButton>
        </Close>
        <Content>
          <div>공유하기</div>
          <p>링크(URL) 복사하기</p>
          <div className="copyInput">
            <div>{window.location.href}</div>
            <button onClick={() => navigator.clipboard.writeText(text)}>복사하기</button>
          </div>
          <div>SNS로 공유하기</div>
          <Icons>
            {icons.map((icon, id) => (
              <div key={id}>
                <img src={icon.imgUrl} />
              </div>
            ))}
          </Icons>
          {children}
        </Content>
      </ModalSection>
    </>
  );
};

const Icons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
`;

const modalSettings = (visible) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

const Background = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  ${(props) => modalSettings(props.visible)}
`;

const ModalSection = styled.div`
  width: 35%;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #202024;
  border-radius: 24px;
  padding: 16px;
  ${(props) => modalSettings(props.visible)}
  > div {
    text-align: center;
  }
`;

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
`;

const Content = styled.div`
  padding: 0 11px 16px 11px;
  > p {
    margin-top: 18px;
    margin-bottom: 6px;
    font-size: 0.875rem;
    text-align: initial;
  }
  > div {
    &.copyInput {
      display: flex;
      font-size: 1rem;
      margin-bottom: 24px;
      > div {
        max-width: 325px;
        font-size: 1rem;
        padding: 15px 24px;
        border: 2px solid #202eae;
        border-radius: 120px;
        margin-right: 12px;
      }
      > button {
        padding: 14px 36px;
        background: #273dff;
        border-radius: 100px;
      }
    }
  }
`;

const CloseButton = styled.button`
  background: url("/images/stage/close.svg") no-repeat 50%;
  width: 24px;
  height: 24px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export default ArtistModal;
