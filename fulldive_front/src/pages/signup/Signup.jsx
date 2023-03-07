import React, { useState } from "react";
import styled, { css } from "styled-components";
import SHA256 from "../../sha256";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Emailimg from '../../assets/images/login/email.svg'
import Email_white from '../../assets/images/login/email_white.svg'
import Passwordimg from '../../assets/images/login/password.svg'
import password_white from '../../assets/images/login/password_white.svg'
import password_visible from '../../assets/images/login/password_visible.svg'
import password__non_visible from '../../assets/images/login/password_non_visible.svg'

const Signup = () => {
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const navigate = useNavigate();

  const handlePasswordType = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const getEmail = () => {
    axios.get(`${process.env.REACT_APP}/user/join`).then(function (res) {
      // 성공 핸들링
      console.log(res);
    });
  };

  // formik
  const ValidationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .required("중복된 이메일 입니다."),
    password: Yup.string()
      .required("영어, 숫자, 기호를 사용하여 8자리 이상 입력해주세요.")
      .min(8, "영어, 숫자, 기호를 사용하여 8자리 이상 입력해주세요.")
      .matches(/[0-9]/, "영어, 숫자, 기호를 사용하여 8자리 이상 입력해주세요.")
      .matches(/[a-z]/, "영어, 숫자, 기호를 사용하여 8자리 이상 입력해주세요.")
      .matches(/[^\w]/, "영어, 숫자, 기호를 사용하여 8자리 이상 입력해주세요."),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호를 입력해주세요"),
  });

  const sessionStorage = window.sessionStorage;

  return (
    <Container>
      <Wrap>
        <Form>
          {/* <Top>
            <Title>
              로그인<p>풀다이브에 오신것을 환영합니다.</p>
            </Title>
            <SocialLogin>
              <div>
                <SosicalLoginButton social="google">구글 계정으로 로그인</SosicalLoginButton>
                <SosicalLoginButton social="line">라인 계정으로 로그인</SosicalLoginButton>
              </div>
              <div>
                <SosicalLoginButton social="apple">애플 계정으로 로그인</SosicalLoginButton>
                <SosicalLoginButton social="kakao">카카오 계정으로 로그인</SosicalLoginButton>
              </div>
            </SocialLogin>
          </Top> */}
          <Or>또는</Or>
          <Formik
            initialValues={{ email: "", password: "", emailSite: "", confirm_password: "" }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));

              const fullEmail = values.email + "@" + values.emailSite;

              sessionStorage.setItem("fullEmail", fullEmail);
              sessionStorage.setItem("password", SHA256(values.password));
              navigate("/signup/type");
            }}
            validationSchema={ValidationSchema}
          >
            {(props) => {
              const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
              return (
                <LoginForm onSubmit={handleSubmit}>
                  <EmailText>
                    <p>이메일</p>
                    {errors.email && touched.email && <Inputfeedback className="input-feedback">{errors.email}</Inputfeedback>}
                  </EmailText>
                  <EmailForm>
                    <Email
                      name="email"
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? " error" : "none"}
                      type="text"
                      placeholder="abcd1234"
                      autoComplete="off"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <span>@</span>
                    <EmailSite
                      name="emailSite"
                      placeholder="이메일 선택"
                      autoComplete="off"
                      value={values.emailSite}
                      onChange={handleChange}
                    />
                  </EmailForm>

                  <PasswordText>
                    <p>비밀번호</p>
                    {errors.password && touched.password && <Inputfeedback className="input-feedback">{errors.password}</Inputfeedback>}
                  </PasswordText>
                  <PasswordForm>
                    <Password
                      onBlur={handleBlur}
                      className={errors.password && touched.password ? " error" : "none"}
                      name="password"
                      type={passwordType.type}
                      autoComplete="off"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <VisibleIcon onClick={handlePasswordType} type={passwordType.type} />
                  </PasswordForm>

                  <PasswordText>
                    <p>비밀번호 확인</p>
                    {errors.confirm_password && touched.confirm_password && (
                      <Inputfeedback className="input-feedback">{errors.confirm_password}</Inputfeedback>
                    )}
                  </PasswordText>
                  <PasswordForm>
                    <Password
                      onBlur={handleBlur}
                      className={errors.confirm_password && touched.confirm_password ? " error" : "none"}
                      name="confirm_password"
                      type={passwordType.type}
                      autoComplete="off"
                      value={values.confirm_password}
                      onChange={handleChange}
                    />
                    <VisibleIcon onClick={handlePasswordType} type={passwordType.type} />
                  </PasswordForm>

                  <LoginButton type="submit">계정 만들기</LoginButton>
                </LoginForm>
              );
            }}
          </Formik>
        </Form>
      </Wrap>
    </Container>
  );
};

const PasswordForm = styled.div`
  position: relative;
`;

const LoginButton = styled.button`
  margin-top: 50px;
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 200px;
  background-color: #273dff;
`;

const VisibleIcon = styled.div`
  position: absolute;
  top: 40%;
  right: 20px;
  width: 24px;
  height: 22px;
  cursor: pointer;
  background: url(${password__non_visible}) no-repeat;
  ${({ type }) => type === "text" && ` background: url(${password_visible}) no-repeat;`}
`;

const Password = styled.input`
  width: 100%;
  margin-top: 10px;
  color: inherit;
  border: none;
  border-radius: 100px;
  padding: 20px 40px 20px 60px;
  background: url(${Passwordimg}) no-repeat 25px 50% #28282f;
  :focus {
    border: 2px solid #273dff;
    background: url(${password_white}) no-repeat 25px 50% #28282f;
  }

  &.error {
    border: 2px solid #ff2e2e;
  }
`;

const Inputfeedback = styled.div`
  color: red;
  margin-left: 0.5rem;
  font-size: 1rem;
`;
const EmailText = styled.div`
  display: flex;
`;

const PasswordText = styled.div`
  display: flex;
  margin-top: 35px;
`;

const EmailSite = styled.input`
  margin-top: 10px;
  max-width: 240px;
  height: 60px;
  border: none;
  border-radius: 100px;
  padding: 20px 40px;
  background-color: #28282f;
  color: inherit;
`;

const Email = styled.input`
  margin-top: 10px;
  max-width: 240px;
  color: inherit;
  height: 60px;
  border: none;
  border-radius: 100px;
  padding: 20px 40px 20px 60px;
  background: url(${Emailimg}) no-repeat 25px 50% #28282f;
  :focus {
    border: 2px solid #273dff;
    background: url(${Email_white}) no-repeat 25px 50% #28282f;
  }

  &.error {
    border: 2px solid #ff2e2e;
  }
`;

const EmailForm = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    color: #aeaeae;
    margin: auto 0;
  }
`;

const LoginForm = styled.form`
  > p {
    margin-top: 35px;
  }
`;

const Or = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  font-size: 1.25rem;
  margin-top: 35px;
  ::before {
    content: "";
    flex-grow: 1;
    background: rgba(99, 99, 99, 1);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin-right: 16px;
  }
  ::after {
    content: "";
    flex-grow: 1;
    background: rgba(99, 99, 99, 1);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin-left: 16px;
  }
`;

const SosicalLoginButton = styled.button`
  min-width: 248px;
  height: 60px;
  padding: 20px 40px 20px 60px;
  margin-top: 36px;
  ${({ social }) => {
    switch (social) {
      case "google":
        return css`
          background: url("/images/login/google.svg") no-repeat 35px 50% #28282f;
          // margin-right: 24px;
        `;
      case "line":
        return css`
          background: url("/images/login/line.svg") no-repeat 35px 50% #28282f;
        `;
      case "apple":
        return css`
          background: url("/images/login/apple.svg") no-repeat 35px 50% #28282f;
          margin-right: 24px;
          margin-top: 12px;
        `;
      case "kakao":
        return css`
          background: url("/images/login/kakao.svg") no-repeat 25px 50% #28282f;
          padding-left: 50px;
          margin-top: 12px;
        `;
    }
  }}
  border-radius: 100px;
  font-size: 1rem;
`;

const SocialLogin = styled.div``;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  > p {
    margin-top: 12px;
    font-weight: 400;
    font-size: 1rem;
  }
`;

const Top = styled.div`
  text-align: center;
`;

const Form = styled.div`
  padding: 36px 32px;
`;

const Wrap = styled.div`
  min-width: 584px;
  height: 698px;
  margin: 36px auto;
  border-radius: 24px; ;
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 120vh;
  background: #14141c;
  color: #ffffff;
  display: flex;
`;

export default Signup;
