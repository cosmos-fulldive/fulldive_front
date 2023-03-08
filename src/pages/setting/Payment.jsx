import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const payment = () => {
  const router = useRouter();

  const data = router.query;

  console.log(data);

  return (
    <Container>
      <Wrap>
        <p>결제하기</p>
        <div>결제 내용</div>
        <CometWrap>
          {data.comet && (
            <Payment>
              <div>코멧</div>
              <div>{data.comet}</div>
            </Payment>
          )}
          {data.ticket && (
            <Payment>
              <div>코멧</div>
              <div>{data.ticket}</div>
            </Payment>
          )}
          <Bottom>
            <div>결제 금액</div>
            <div>{data && Number(data.comet) + Number(data.ticket)}</div>
          </Bottom>
        </CometWrap>
        <div>카드 정보 입력</div>
      </Wrap>
    </Container>
  );
};

const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #2e2e33;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    font-size: 1rem;
  }
`;

const CometWrap = styled.div`
  padding: 24px;
  margin: 12px 0 24px;
  background: #26262b;
  border-radius: 12px;
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
    margin-bottom: 24px;
  }
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

export default payment;
