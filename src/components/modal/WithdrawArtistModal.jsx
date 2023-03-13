import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const WithdrawArtistModal = ({ visible, onClose }) => {
  const [confirm, setConfirm] = useState(false);

  if (!visible) {
    return null;
  }

  const sendConfirm = () => {
    setConfirm(true);
  };

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <Close>
          <CloseButton type="button" onClick={onClose}></CloseButton>
        </Close>
        {confirm ? (
          <Content>
            <div className="confirm_title">회원탈퇴</div>
            <p className="confirm">탈퇴 요청 완료</p>
            <p className="confirm">
              풀다이브 회원 탈퇴 요청이 완료되었습니다. 관리자 확인후 회원탈퇴 완료시 회원가입 시 기재한 이메일로 안내 드리겠습니다.
            </p>
            <button onClick={onClose}>확인</button>
          </Content>
        ) : (
          <Content>
            <div>회원탈퇴</div>
            <p>탈퇴전 유의사항</p>
            <p className="main">
              회원 탈퇴 요청을 하시면 해당 계정은 관리자 확인 후 회원탈퇴 처리되며 이후 영구적으로 사용이 중지되므로 새로운 아이디로만
              재가입이 가능합니다.
            </p>
            <p className="main">
              사이트에 등록된 게시글,댓글,컨텐츠는 탈퇴 후에도 삭제되지 않습니다. 게시글,댓글의 삭제를 원하시는 경우에는 반드시 탈퇴 전
              삭제하시기 바랍니다. 컨텐츠 삭제를 원하시는 경우 폴다이브로 문의 바랍니다.
            </p>
            <p className="bottom">
              계약 내용에 따라 회원탈퇴가 정상적으로 처리되지 않을 수 있습니다. 해당 계약 사항 관련해서는 폴다이브로 문의 바랍니다.
            </p>
            <button onClick={sendConfirm}>탈퇴 요청</button>
          </Content>
        )}
      </ModalSection>
    </>
  );
};

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
  width: 37%;
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
  > div {
    &.confirm_title {
      margin-bottom: 40px;
    }
  }
  > p {
    margin-top: 18px;
    margin-bottom: 6px;
    font-size: 1rem;
    text-align: initial;
    &.main {
      margin-top: 12px;
      font-size: 0.875rem;
      color: #c5c5c5;
    }
    &.bottom {
      margin-top: 12px;
      font-size: 0.875rem;
      color: #ff2e2e;
    }
    &.confirm {
      margin-top: 6px;
      text-align: center;
    }
  }
  > button {
    margin-top: 24px;
    background: #273dff;
    padding: 15px 50px;
    border-radius: 36px;
    font-size: 1rem;
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

export default WithdrawArtistModal;
