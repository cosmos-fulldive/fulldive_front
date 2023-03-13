import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useLocation } from "react-router-dom";



const DonationModal = ({ children, visible, onClose, onChange, setselectArtist }) => {
  const location = useLocation();
  const [artistSelected, setartistSelected] = useState(location.state.data.stageArtistId[0]);

  const sendData = () => {
    setselectArtist(artistSelected);
    onChange()
  }

  const handleChange = (e) => {
    setartistSelected(e.target.value);
  };

  if (!visible) {
    return null;
  }

  console.log(artistSelected);

  const text = window.location.href;

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>

        <CloseBox>
          <Close>
            <ClooseText>
              응원하기
            </ClooseText>
          </Close>
          <CloseButtonBox>
            <CloseButton type="button" onClick={onClose}></CloseButton>
          </CloseButtonBox>
        </CloseBox>
        <Content>

          <p>응원 할 아티스트를 선택해주세요!</p>
          <ArtistDonationBox>
            <ArtistDonation>
              <input type="radio" name="A아티스트" value={location.state.data.stageArtistId} checked={artistSelected === location.state.data.stageArtistId[0]} onChange={handleChange} />
              <label>{location.state.data.stageArtistId}</label>

            </ArtistDonation>
          </ArtistDonationBox>
          <ButtonBox>
            <FightButton onClick={sendData} >응원하기</FightButton>
          </ButtonBox>
          {/* <Icons>
            {icons.map((icon, id) => (
              <div key={id}>
                <img src={icon.imgUrl} />
              </div>
            ))}
          </Icons> */}
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

const ArtistDonationBox = styled.div`
  display: flex;
  
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
`;

const ArtistDonation = styled.div`
  margin-top: 12px;
  > label {
    width: 95%;
    margin: 10px;
    font-size: 16px;
  }
`;

const FightButton = styled.button`
width: 100%;
  flex-direction: row;
justify-content: center;
align-items: center;
padding: 12px 80px;
background: #273DFF;
border-radius: 100px;
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
      width: 420px;
      height: 230px;
    position: absolute;
    /* top: 50%; */
    /* left: 50%; */
    transform: translate(-140%, -200%);
    background-color: rgb(32, 32, 36);
    border-radius: 24px;
    padding: 24px 24px 36px 24px;;
    visibility: visible;
    z-index: 15;
    animation: 0.15s ease-out 0s 1 normal none running cJoqxJ;
    transition: visibility 0.15s ease-out 0s;
  ${(props) => modalSettings(props.visible)}
  > div {
    text-align: center;
  }
`;

const Close = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseBox = styled.div`
      display: flex;
    position: relative;
    /* width: 100%; */
    justify-content: center;
  
`;

const ClooseText = styled.div`
  /* display: flex;
  align-items: center; */
  
`;
const CloseButtonBox = styled.div`
  position: absolute;
  right: 0;
`;

const Content = styled.div`
  display: flex;
    flex-direction: column;
  > p {
    margin-top: 24px;
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

export default DonationModal;
