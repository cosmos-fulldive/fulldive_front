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

const ArtistModal = ({ data, visible, onClose }) => {
  if (!visible) {
    return null;
  }

  console.log(data);

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <Close>
          <CloseButton type="button" onClick={onClose}></CloseButton>
        </Close>
        <Content>
          <div>아티스트</div>
          <Wrap>
            <div>
              <img src={`http://fulldive.live:8881/artist_images/${data.artistImage}`} />
            </div>
            <div>
              {data.artistName}
              <p>{data.artistCategory}카테고리</p>
            </div>
          </Wrap>
          <Description>{data.artistDescription}</Description>
        </Content>
      </ModalSection>
    </>
  );
};

const Description = styled.div`
  text-align: initial;
  margin-top: 20px;
`;

const Wrap = styled.div`
  text-align: initial;
  margin-top: 20px;
  display: flex;
  > div {
    &:nth-child(1) {
      margin-right: 20px;
    }
    > img {
      border-radius: 12px;
    }
    > p {
      color: #acacac;
      margin-top: 30px;
    }
  }
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
