import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const declaration_reasons = [
  {
    id: 1,
    reason: "폭력적 또는 혐오스러운 콘텐츠",
  },
  {
    id: 2,
    reason: "증오 또는 악의적인 콘텐츠",
  },
  {
    id: 3,
    reason: "희롱 또는 괴롭힘",
  },
  {
    id: 4,
    reason: "성적인 콘텐츠",
  },
  {
    id: 5,
    reason: "스팸 및 광고",
  },
  {
    id: 6,
    reason: "잘못된 정보",
  },
  {
    id: 7,
    reason: "기타",
  },
];

const DeclarationModal = ({ visible, onClose }) => {
  if (!visible) {
    return null;
  }

  const [text, setText] = useState("");
  const [checkedList, setCheckedList] = useState([]);

  const checkOnlyOne = (checkThis) => {
    const checkedList = document.getElementsByName("test");
    for (let i = 0; i < checkedList.length; i++) {
      if (checkedList[i] !== checkThis) {
        checkedList[i].checked = false;
      }
    }
    console.log(checkedList);
  };

  const handleMessageValue = (e) => {
    setText(e.target.value);
  };

  console.log(text);

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <Close>
          <CloseButton type="button" onClick={onClose}></CloseButton>
        </Close>
        <Content>
          <div className="declaration">신고하기</div>
          <span>신고사유</span>
          <span className="reason">신고 사유를 선택해주세요</span>
          <DeclareContainer>
            {declaration_reasons.map((reason, id) => (
              <div key={id}>
                <input type="checkbox" name="test" value={reason.id} onChange={(e) => checkOnlyOne(e.target)} />
                {reason.reason}
              </div>
            ))}
          </DeclareContainer>
          <Textarea id="text" name="text" value={text} onChange={handleMessageValue} />
          <Button>전송</Button>
        </Content>
      </ModalSection>
    </>
  );
};

const Button = styled.button`
  display: block;
  padding: 11px 46px;
  background: #273dff;
  border-radius: 36px;
  margin: 12px auto 0;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 130px;
  resize: none;
  background: none;
  border: 2px solid #202eae;
  border-radius: 12px;
  color: #ffffff;
  padding: 12px;
`;

const DeclareContainer = styled.div`
  margin: 10px 0;
  > div {
    font-size: 0.875rem;
    margin-bottom: 12px;
    > input {
      appearance: none;
      background: #d9d9d9;
      width: 20px;
      height: 20px;
      border-radius: 12px;
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
`;

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
`;

const Content = styled.div`
  padding: 0 11px 16px 11px;
  > div {
    &.declaration {
      text-align: center;
      margin-bottom: 12px;
    }
  }
  > span {
    font-size: 1rem;
    &.reason {
      font-size: 0.875rem;
      color: #ff2121;
      margin-left: 8px;
      line-height: 19px;
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

export default DeclarationModal;
