import React, { ChangeEvent, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import PaymentNext from "../PaymentNext";

const PaymentModal = ({ children, visible, onClose }: any) => {
  if (!visible) {
    return null;
  }

  const [selected, setSelected] = useState({
    comet: "",
    ticket: "",
  });

  const [payment, setPayment] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setSelected({
      ...selected, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const goToPayment = () => {
    setPayment(true);
  };

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <Close>
          <CloseButton type="button" onClick={onClose}></CloseButton>
        </Close>
        <p>결제하기</p>
        {payment === true ? (
          <PaymentNext />
        ) : (
          <>
            <CometWrap>
              <span>보유 코멧</span>
              {children.comet}
            </CometWrap>
            <TicketWrap>
              <p>보유 티켓</p>
              <Ticket>
                <TicketBorder>
                  <IndividualTicket ticket="clover">{children.clover}장</IndividualTicket>
                  <IndividualTicket ticket="dia">{children.dia}장</IndividualTicket>
                </TicketBorder>
                <div style={{ paddingLeft: "24px" }}>
                  <IndividualTicket ticket="heart">{children.heart}장</IndividualTicket>
                  <IndividualTicket ticket="spade">{children.spade}장</IndividualTicket>
                </div>
              </Ticket>
            </TicketWrap>
            <TicketWrap>
              <p>코멧 구매</p>
              <CometDiv>
                <div>
                  <CometInput type="radio" name="comet" value="10000" checked={selected.comet === "10000"} onChange={handleChange} />
                  <CometLabel ticket="comet">코멧</CometLabel>
                </div>
                <div>￦ 10000</div>
              </CometDiv>
              <CometDiv>
                <div>
                  <CometInput type="radio" name="comet" value="30000" checked={selected.comet === "30000"} onChange={handleChange} />
                  <CometLabel ticket="comet">코멧</CometLabel>
                </div>
                <div>￦ 30000</div>
              </CometDiv>
              <CometDiv>
                <div>
                  <CometInput type="radio" name="comet" value="50000" checked={selected.comet === "50000"} onChange={handleChange} />
                  <CometLabel ticket="comet">코멧</CometLabel>
                </div>
                <div>￦ 50000</div>
              </CometDiv>
            </TicketWrap>
            <TicketWrap>
              <p>티켓 구매</p>
              <CometDiv>
                <div>
                  <CometInput type="radio" name="ticket" value="10000" checked={selected.ticket === "10000"} onChange={handleChange} />
                  <CometLabel ticket="clover">클로버</CometLabel>
                </div>
                <div>￦ 10000</div>
              </CometDiv>
              <CometDiv>
                <div>
                  <CometInput type="radio" name="ticket" value="20000" checked={selected.ticket === "20000"} onChange={handleChange} />
                  <CometLabel ticket="dia">다이아</CometLabel>
                </div>
                <div>￦ 20000</div>
              </CometDiv>
              <CometDiv>
                <div>
                  <CometInput type="radio" name="ticket" value="30000" checked={selected.ticket === "30000"} onChange={handleChange} />
                  <CometLabel ticket="heart">하트</CometLabel>
                </div>
                <div>￦ 30000</div>
              </CometDiv>
              <CometDiv>
                <div>
                  <CometInput type="radio" name="ticket" value="40000" checked={selected.ticket === "40000"} onChange={handleChange} />
                  <CometLabel ticket="spade">스페이드</CometLabel>
                </div>
                <div>￦ 40000</div>
              </CometDiv>
            </TicketWrap>
            {/* <Link
          href={{
            pathname: "/setting/coin/payment",
            query: selected,
          }}
        > */}
            <Button onClick={goToPayment}>다음</Button>
            {/* </Link> */}
          </>
        )}
      </ModalSection>
    </>
  );
};

const Button = styled.button`
  display: block;
  max-width: 120px;
  margin: 24px auto 0;
  padding: 15px 45px;
  background: #273dff;
  border-radius: 36px;
  font-size: 1rem;
`;

const CometDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  padding-bottom: 7px;
  border-bottom: 1px solid #2e2e33;
  > span {
    text-align: right;
  }
  > div {
    font-size: 1rem;
  }
`;

const CometLabel = styled.label<{ ticket: string }>`
  background: url("/images/comet.svg") no-repeat 10px;
  background-size: 24px;
  padding-left: 40px;
  ${({ ticket }) => {
    switch (ticket) {
      case "clover":
        return `background: url("/images/ticket_clover.svg") no-repeat 10px`;
      case "dia":
        return `background: url("/images/ticket_dia.svg") no-repeat 10px;`;
      case "heart":
        return `background: url("/images/ticket_heart.svg") no-repeat 10px`;
      case "spade":
        return `background: url("/images/ticket_spade.svg") no-repeat 10px;`;
    }
  }}
`;

const IndividualTicket = styled.div<{ ticket: string }>`
  text-align: right;
  font-size: 1rem;
  ${({ ticket }) => {
    switch (ticket) {
      case "clover":
        return `background: url("/images/ticket_clover.svg") no-repeat left`;
      case "dia":
        return `background: url("/images/ticket_dia.svg") no-repeat left; margin-top: 16px;`;
      case "heart":
        return `background: url("/images/ticket_heart.svg") no-repeat left`;
      case "spade":
        return `background: url("/images/ticket_spade.svg") no-repeat left; margin-top: 16px;`;
    }
  }}
`;

const CometInput = styled.input``;

const TicketBorder = styled.div`
  border-right: 2px solid #2e2e33;
  padding-right: 24px;
`;

const Ticket = styled.div`
  display: flex;
  padding-top: 20px;
  > div {
    width: 50%;
  }
`;

const TicketWrap = styled.div`
  margin-top: 16px;
  padding: 12px 24px 24px;
  background: #26262b;
  border-radius: 12px;
  > p {
    font-size: 0.875rem;
  }
`;

const CometWrap = styled.div`
  width: fit-content;
  margin-top: 12px;
  padding: 7px 12px;
  background: #26262a;
  border-radius: 100px;
  font-size: 0.875rem;
  > span {
    padding-right: 25px;
    margin-right: 5px;
    background: url("/images/ranking.svg") no-repeat right;
    background-size: 16px 16px;
  }
`;

const Wrap = styled.div`
  margin: 100px auto;
  width: 520px;
  height: fit-content;
  background: #181820;
  border-radius: 24px;
  padding: 24px;
  > p {
    text-align: center;
  }
`;

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
`;

const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? "visible" : "hidden"};
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

const ModalSection = styled.div<{ visible: boolean }>`
  width: 520px;
  height: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #202024;
  border-radius: 24px;
  padding: 24px;
  ${(props) => modalSettings(props.visible)}
  z-index: 999;
  > div {
    text-align: center;
  }
  > p {
    text-align: center;
  }
`;

const Background = styled.div<{ visible: boolean }>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);

  ${(props) => modalSettings(props.visible)}
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

export default PaymentModal;
