
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const SignupComplete = () => {


  const userInfo = {
    user_email: sessionStorage.getItem("fullEmail"),
    user_password: sessionStorage.getItem("password"),
    user_nickname: sessionStorage.getItem("Nickname"),
    user_gender: sessionStorage.getItem("Gender"),
    user_name: sessionStorage.getItem("Name"),
    user_birth: sessionStorage.getItem("Brith"),
    user_nation: sessionStorage.getItem("Country"),
    user_city: sessionStorage.getItem("City"),
    user_address: sessionStorage.getItem("Address"),
    user_phone: sessionStorage.getItem("Phone"),
    user_category: sessionStorage.getItem("music"),
  };

  console.log(userInfo);

  return (
    <Container>
      <Form>
        <img src="/images/signup/complete.svg" width="100px" height="100px" />
        <div>가입완료</div>
        <p>Welcome to FullDive!</p>
<<<<<<< HEAD
        <Link to="/" legacyBehavior passHref>
=======
        <Link href="/">
>>>>>>> 2d738ee5f3236a41b8855e4dccbb04ce192dc8bb
          <button>메인으로 이동</button>
        </Link>
      </Form>
    </Container>
  );
};

const Form = styled.div`
  max-width: 250px;
  margin: 20% auto;
  text-align: center;
  > div {
    margin-top: 24px;
    font-size: 2.25rem;
  }
  > p {
    margin-top: 24px;
    font-size: 1.25rem;
  }
  > button {
    width: 100%;
    margin-top: 24px;
    padding: 20px 80px;
    background-color: #273dff;
    border-radius: 200px;
    font-size: 1rem;
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

export default SignupComplete;
