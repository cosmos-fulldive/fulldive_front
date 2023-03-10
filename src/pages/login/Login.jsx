import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import SHA256 from "../../sha256";
import { useDispatch } from "react-redux";
import { setToken, setAdmin } from "../../store/_redcuers/authReducer";
import { useNavigate, Link } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";

// import liff from '@line/liff';
// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const frog = 1;
console.log(123123);

const Login = () => {
  const dispatch = useDispatch();

  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  const [values, setValues] = useState({
    email: "",
    emailSite: "",
    password: "",
  });

  const { email, emailSite, password } = values;

  const fullEmail = email + "@" + emailSite;

  const handlePasswordType = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const [contactGroups, setContactGroups] = useState([]);

  // formik
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("이메일을 입력해주세요."),
    password: Yup.string().required("비밀번호를 입력해 주세요."),
  });

  // ================================================================================  Google 로그인  =================================================================================

  const navigate = useNavigate();
  let gapi = window.gapi;

  const GOOGLE_CLIENT_ID = "181931049890-18f0g8iibl4ovduro9jehsjuekfnef5k.apps.googleusercontent.com";
  //   const AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";
  //   const PEOPLE_URI = "https://people.googleapis.com/v1/contactGroups";

  useEffect(() => {
    // Load the Google API client library
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
      });
    });
  }, []);

  const GoogleLoginHandler = async () => {
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      const user = await auth2.signIn();

      // Send the user ID token to your server to authenticate the user
      const idToken = user.getAuthResponse().id_token;
      // Replace the API endpoint with your server's authentication endpoint
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ================================================================================  Kakao 로그인  =================================================================================

  const kakaoLogin = async () => {
    const { Kakao } = window;
    // 카카오 초기화
    if (!Kakao.isInitialized()) {
      Kakao.init("446d0bddcd2aabc533a967c7c8d61f0e");
    }

    // 카카오 로그인 구현

    Kakao.Auth.login({
      success: () => {
        Kakao.API.request({
          url: "/v2/user/me", // 사용자 정보 가져오기
          success: (res) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push
            console.log(res);
            navigate("/login");
          },
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  // ================================================================================  Line 로그인  =================================================================================

  const Line_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657847379&redirect_uri=http://localhost:3000/login&state=cosmos&scope=profile%20openid%20email`;

  // const runApp = () => {
  //   const idToken = liff.getIDToken();
  //   liff.getProfile().then(profile => {
  //     console.log(profile)
  //     setDisplayName(profile.displayName)
  //     setUserID(profile.userId)
  //   }).catch(err => console.error(err));
  // }

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
                <SosicalLoginButton className="g-signin2" data-onsuccess="GoogleLoginHandler" onClick={GoogleLoginHandler} social="google">
                  구글 계정으로 로그인
                </SosicalLoginButton>

                <SosicalLoginButton onClick={LineLoginHandler} social="line">
                  라인 계정으로 로그인
                </SosicalLoginButton>
              </div>
              <div>
                <SosicalLoginButton social="apple">애플 계정으로 로그인</SosicalLoginButton>
                <SosicalLoginButton onClick={kakaoLogin} social="kakao">
                  카카오 계정으로 로그인
                </SosicalLoginButton>
              </div>
            </SocialLogin>
          </Top> */}

          <Or>또는</Or>

          <Formik
            initialValues={{ email: "", password: "", emailSite: "" }}
            onSubmit={async (values) => {
              const fullEmail = values.email + "@" + values.emailSite;

              const userData = {
                userEmail: fullEmail,
                // userPassword: values.password,
                userPassword: SHA256(values.password),
              };
              console.log(userData);
              try {
                const { data } = await axios.post(`http://118.63.182.3:8880/api/user/login`, userData);
                data.responses === 200 && dispatch(setToken(data.jwt));
                dispatch(setAdmin(data.admin));
                console.log(data.responses);
                // navigate("/");
              } catch (e) {
                // 서버에서 받은 에러 메시지 출력
                console.log(e);
                window.alert("로그인 에러");
              }
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
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? " error" : "none"}
                      name="email"
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
                  <LoginButton type="submit">접속하기</LoginButton>
                  <Bottom>
                    {/* <p className="mssing_user">아이디 / 비밀번호 찾기</p> */}
                    <Link to="/signup">
                      <p>계정이 없으신가요?</p>
                    </Link>
                  </Bottom>
                </LoginForm>
              );
            }}
          </Formik>
        </Form>
      </Wrap>
    </Container>
  );
};

const Bottom = styled.div`
  margin-top: 12px;
  display: flex;
  // justify-content: space-between;
  justify-content: flex-end;
  font-size: 1rem;
  color: #8692ff;
  > p {
    &.mssing_user {
      color: #b7b7b7;
    }
  }
`;

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
  background: url("/images/login/password_non_visible.svg") no-repeat;
  ${({ type }) => type === "text" && ` background: url("/images/login/password_visible.svg") no-repeat;`}
`;

const Password = styled.input`
  width: 100%;
  margin-top: 10px;
  color: inherit;
  border: none;
  border-radius: 100px;
  padding: 20px 40px 20px 60px;
  background: url("/images/login/password.svg") no-repeat 25px 50% #28282f;
  :focus {
    border: 2px solid #273dff;
    background: url("/images/login/password_white.svg") no-repeat 25px 50% #28282f;
  }
  &.error {
    border: 2px solid #ff2e2e;
  }
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
  background: url("/images/login/email.svg") no-repeat 25px 50% #28282f;
  :focus {
    border: 2px solid #273dff;
    background: url("/images/login/email_white.svg") no-repeat 25px 50% #28282f;
  }

  &.error {
    border: 2px solid #ff2e2e;
  }
`;

const EmailText = styled.div`
  display: flex;
`;

const Inputfeedback = styled.div`
  color: red;
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const PasswordText = styled.div`
  display: flex;
  margin-top: 35px;
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
  height: 100%;
  background: #14141c;
  color: #ffffff;
  display: flex;
`;

export default Login;
