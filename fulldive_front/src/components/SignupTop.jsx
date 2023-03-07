import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const SignupTop = () => {
  const router = useRouter();
  const { pathname } = router;

  const menus = [
    {
      id: 1,
      name: "약관 동의",
      imgUrl: "/images/signup/agreement_white.svg",
      nowImgUrl: "/images/signup/agreement_white.svg",
      pathname: "/signup/type/agreement",
    },
    {
      id: 2,
      name: "개인정보 입력",
      imgUrl: "/images/signup/agreement_white.svg",
      nowImgUrl: "/images/signup/agreement_white.svg",
      pathname: "/signup/type/insert",
    },
    {
      id: 3,
      name: "좋아하는 장르",
      imgUrl: "/images/signup/agreement_white.svg",
      nowImgUrl: "/images/signup/agreement_white.svg",
      pathname: "/signup/type/favorite_music",
    },
    {
      id: 4,
      name: "가입완료",
      imgUrl: "/images/signup/agreement_white.svg",
      nowImgUrl: "/images/signup/agreement_white.svg",
      pathname: "/signup/type/complete",
    },
  ];

  return (
    <Nav>
      {menus.map((menu, index) => (
        <Link href={menu.pathname} key={index} legacyBehavior passHref>
          <NavInfo key={index} imgUrl={menu.imgUrl} isHere={pathname === menu.pathname} nowImgUrl={menu.nowImgUrl}>
            {menu.name}
          </NavInfo>
        </Link>
      ))}
    </Nav>
  );
};

const Nav = styled.nav`
  min-width: 250px;
  padding: 10px 30px;
  color: #878787;
  display: flex;
`;

const NavInfo = styled.a`
  display: inline-block;
  min-height: 40px;
  margin-bottom: 30px;
  background-position: 0 50%;
  background-size: contain;
  padding-left: 40px;
  line-height: 40px;
  ${(props) =>
    props.isHere
      ? `
      color: #ffffff;
      background: url(${props.nowImgUrl}) no-repeat left 50%;
  `
      : `
      color: #8B8B8B;
      background: url(${props.imgUrl}) no-repeat left 50%;;
  `}
  :hover {
    color: #ffffff;
    ${(props) => `background: url(${props.nowImgUrl}) no-repeat left 50%;`}
  }
`;

export default SignupTop;
