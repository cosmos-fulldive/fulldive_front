import React, { useState } from "react";
import styled from "styled-components";
import PaymentModal from "../../../components/modal/PaymentModal";

const paid = {
  comet: 30,
  total_ticket: 30,
  clover: 10,
  spade: 20,
  heart: 10,
  dia: 0,
};

const Coin = () => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
  };
  const closePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  return (
    <Container>
      <Wrap>
        <Left>
          <Comet>
            보유 코멧<p>{paid.comet}</p>
          </Comet>
          <Ticket>
            <TicketTop>
              보유 티켓<p>{paid.total_ticket}</p>
            </TicketTop>
            <TicketDes>
              <div>
                <p>클로버</p>
                {paid.clover}장
              </div>
              <div>
                <p>스페이드</p>
                {paid.spade}장
              </div>
              <div>
                <p>하트</p>
                {paid.heart}장
              </div>
              <div>
                <p>다이아</p>
                {paid.dia}장
              </div>
            </TicketDes>
          </Ticket>
          <CometButton onClick={openPaymentModal}>코멧 및 티켓 구매하기</CometButton>
          <PaymentModal children={paid} visible={paymentModalOpen} onClose={closePaymentModal} />
        </Left>
        <Right>
          <button>코멧 거래내역</button>
          <button>티켓 거래내역</button>
          <div>asd</div>
        </Right>
      </Wrap>
    </Container>
  );
};

const CometButton = styled.button`
  height: 60px;
  padding: auto;
  margin-top: 24px;
  width: 100%;
  background: #273dff;
  border-radius: 36px;
`;

const TicketDes = styled.div`
  margin-top: 12px;
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }
`;

const Right = styled.div`
  flex: 0.66;
  > button {
    background: #2e2e3d;
    padding: 7px 24px;
    border-radius: 100px;
    &:nth-child(1) {
      margin-right: 12px;
    }
    margin-bottom: 24px;
  }
`;

const TicketTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #2b2b39;
  font-size: 1.25rem;
`;

const Ticket = styled.div`
  margin-top: 12px;
  padding: 25px 30px;
  background: #181820;
  border-radius: 12px;
  font-size: 1.25rem;
`;

const Comet = styled.div`
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  background: #181820;
  border-radius: 12px;
  font-size: 1.25rem;
  > p {
    background: url("/images/ranking.svg") no-repeat left;
    background-size: 24px;
    padding-left: 30px;
  }
`;

const Left = styled.div`
  flex: 0.34;
  margin-right: 24px;
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100%;
  background: #14141c;
  color: #ffffff;
  padding: 30px;
  display: flex;
  padding-top: 30px;
`;

export default Coin;
