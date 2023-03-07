import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Ex from "../../../public/images/signup/user.svg";
// import Ex2 from "../../../public/images/signup/user_white.svg";
import { boolean } from "yup";
import { useNavigation } from "react-router-dom";

const types = [
  {
    id: 1,
    description: "일반(팬)",
  },
  {
    id: 2,
    description: "아티스트",
  },
];

const Type = () => {
  const navigate = useNavigation();
  const sessionStorage = window.sessionStorage;
  // console.log(sessionStorage.getItem('fullEmail'));
  // console.log(sessionStorage.getItem('password'));
  const userInfo = {
    email: sessionStorage.getItem("fullEmail"),
    password: sessionStorage.getItem("password"),
  };

  console.log(userInfo);

  const [checkValue, setCheckValue] = useState([1, 2]);

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const checkOnlyOne = (id) => {
    // id.target.checked = true;
    setCheckValue(id.target.defaultValue);
    setIsChecked((check) => !check);
    setIsChecked2(false);
  };

  const checkOnlyOne2 = (id) => {
    setCheckValue(id.target.defaultValue);
    setIsChecked2((check) => !check);
    setIsChecked(false);
  };

  console.log(checkValue);

  const nextUrl = () => {
    if (sessionStorage.getItem("password") === null) {
      alert("이메일 또는 비밀번호를 먼저 입력하세요");
      navigate("/signup");
    } else if (isChecked == false && isChecked2 == false) {
      alert("You must check 1 checkboxes!");
      return;
    } else {
      sessionStorage.setItem("type", checkValue);

      navigate("/signup/type/agreement");
    }
  };

  const backUrl = () => {
    window.location.href = "/signup";
  };

  return (
    <Container>
      <Form>
        <div>회원 유형 선택</div>
        <Member>
          <MemberType checked={isChecked} className="fan">
            <StyledInput
              className="ex"
              type="checkbox"
              id="btn2"
              checked={isChecked}
              name="checkWrap"
              value="일반"
              onChange={(e) => checkOnlyOne(e)}
            />

            <p>일반(팬)</p>
            {/* {isChecked ? <Ex /> : <Ex2 />} */}
          </MemberType>

          <MemberType2 checked2={isChecked2} className="artist">
            <StyledInput
              type="checkbox"
              id="btn2"
              name="checkWrap"
              value="아티스트"
              onChange={(e) => checkOnlyOne2(e)}
              checked={isChecked2}
            />

            <p>아티스트</p>
          </MemberType2>
        </Member>
        <Bottom>
          <button onClick={backUrl} className="previous">
            이전
          </button>

          <button onClick={nextUrl} className="next">
            다음
          </button>
        </Bottom>
      </Form>
    </Container>
  );
};

const Member = styled.div`
  display: flex;
  color: #858585;
  margin-top: 30%;
  cursor: pointer;
`;

const MemberType = styled.div`
  width: 50%;
  height: 188px;
  border-radius: 12px;

  ${({ checked }) =>
    !checked
      ? `background: url("/images/signup/user.svg") no-repeat 50% 40% #0f0f15;`
      : `background: url("/images/signup/user_white.svg") no-repeat 50% 40% #0f0f15;`}

  ${({ checked }) =>
    !checked
      ? `border: 1px solid #282828;`
      : `border: 4px solid #262667;
    `}
    > p {
    margin-top: 55%;
    ${({ checked }) =>
      !checked
        ? `color: #858585;`
        : `color: #E2E2E2;
          `}
  }
  &.artist {
    margin-left: 24px;
  }
`;

const MemberType2 = styled.div`
  width: 50%;
  height: 188px;
  border-radius: 12px;
  ${({ checked2 }) =>
    !checked2
      ? `background: url("/images/signup/user.svg") no-repeat 50% 40% #0f0f15;`
      : `background: url("/images/signup/user_white.svg") no-repeat 50% 40% #0f0f15;`}

  ${({ checked2 }) =>
    !checked2
      ? `border: 1px solid #282828;`
      : `border: 4px solid #262667;
    `}
> p {
    margin-top: 55%;
    ${({ checked2 }) =>
      !checked2
        ? `color: #858585;`
        : `color: #E2E2E2;
          `}
  }
  &.artist {
    margin-left: 24px;
  }
`;

const StyledInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  float: right;
  margin-top: 1.25rem;
  margin-right: 1.25rem;
  border-radius: 100px;
  background-image: url("/images/signup/checked.svg");
  background-size: 70% 70%;
  background-position: 50% 60%;
  background-repeat: no-repeat;
  background-color: #5c5c5c;
  &:checked {
    border-color: transparent;
    background-image: url("/images/signup/checked.svg");
    background-color: #273dff;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin: 30% auto 0;
  > button {
    width: 50%;
    border-radius: 200px;
    font-size: 1rem;
    &.previous {
      border: 1px solid #888888;
    }
    &.next {
      background-color: #273dff;
      margin-left: 24px;
    }
  }
`;

const Form = styled.div`
  max-width: 520px;
  margin: 36px auto;
  text-align: center;
  > p {
    font-size: 1.25rem;
  }
`;

const Container = styled.div`
  display: inline-block;
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100%;
  background: #14141c;
  color: #ffffff;
`;

// const Link = styled.div`

// `;

export default Type;
