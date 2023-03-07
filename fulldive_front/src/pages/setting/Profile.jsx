import WithdrawArtistModal from "../../components/modal/WithdrawArtistModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const openWithdrawModal = () => {
    setWithdrawModalOpen(true);
  };
  const closeWithdrawModal = () => {
    setWithdrawModalOpen(false);
  };

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    !token && navigate("/login");
  }, [token]);

  return (
    <Container>
      <Wrap>
        <Top>
          <div className="profile">
            <div />
          </div>
          <div>
            <p>nickname입니다.</p>
            <span>tkddus614@naver.com</span>
            <Change>
              <button>닉네임 변경</button>
              <button>비밀번호 재설정</button>
            </Change>
          </div>
        </Top>
        <Info>
          <FlexWrap>
            <div>
              <p>상호명</p>
              <Input placeholder="공연기획사" />
            </div>
            <div />
          </FlexWrap>
          <FlexWrap>
            <div>
              <p>담당자명</p>
              <Input placeholder="공연기획사" />
            </div>
            <div>
              <p>사업자 등록번호</p>
              <Input placeholder="공연기획사" />
            </div>
          </FlexWrap>
          <FlexWrap>
            <div>
              <p>국가</p>
              <Input placeholder="서울특별시" />
            </div>
            <div>
              <p>사업장 도시</p>
              <Input placeholder="관악구" />
            </div>
          </FlexWrap>
          <Input placeholder="상세 주소를 입력해주세요" />
          <FlexWrap>
            <div>
              <p>업태</p>
              <Input placeholder="서울특별시" />
            </div>
            <div>
              <p>업종</p>
              <Input placeholder="관악구" />
            </div>
          </FlexWrap>
          <FlexWrap>
            <p />
            <p className="text" onClick={openWithdrawModal}>
              회원탈퇴
            </p>
          </FlexWrap>
          <SendButton>수정</SendButton>
          <WithdrawArtistModal visible={withdrawModalOpen} onClose={closeWithdrawModal} />
        </Info>
      </Wrap>
    </Container>
  );
};

const SendButton = styled.button`
  width: 100%;
  height: 60px;
  padding: 18px auto;
  background: #273dff;
  border-radius: 200px;
  margin-top: 52px;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  > div {
    width: 48%;
    margin-bottom: 10px;
  }
  > p {
    margin-top: 10px;
    font-size: 1rem;
    text-decoration: underline;
    &.text {
      cursor: pointer;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: 10px;
  background: rgba(217, 217, 217, 0.1);
  border-radius: 100px;
  border: 1px solid rgba(217, 217, 217, 0.1);
  height: 40px;
  padding: 0 12px;
  color: #ffffff;
  /* &.solo {
    width: 48%;
  } */
`;

const Info = styled.div`
  margin-top: 48px;
  /* > div {
    width: 48%;
  } */
`;

const Change = styled.div`
  display: flex;
  > button {
    padding: 8px 12px;
    background: #1d1d22;
    border-radius: 100px;
    margin: 10px 10px 0 0;
    font-size: 1rem;
  }
`;

const Top = styled.div`
  display: flex;
  > div {
    margin-top: 10px;
    &.profile {
      margin-top: 0;
      position: relative;
      width: 108px;
      height: 108px;
      background: url("/images/setting/user_white.svg") no-repeat center #28282f;
      background-size: 60px;
      border-radius: 100px;
      margin-right: 26px;
      > div {
        width: 36px;
        height: 36px;
        position: absolute;
        background: url("/images/setting/camera.svg") no-repeat center #273dff;
        border-radius: 20px;
        bottom: 0;
        right: 0;
      }
    }
    > p {
      font-size: 1.25rem;
    }
    > span {
      margin-top: 6px;
      color: #e2e2e2;
      font-size: 1rem;
    }
  }
`;

const Wrap = styled.div`
  min-width: 520px;
  height: 698px;
  margin: 30px auto;
  border-radius: 24px; ;
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

export default Profile;
