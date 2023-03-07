import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";

const ArtistComplete = () => {
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
        <div>가입 요청 완료</div>
        <p>가입 승인까지 영업일 기준 최대 3~5일이 소요됩니다.</p>
        <Link href="/">
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

export default ArtistComplete;
