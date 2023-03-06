import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Link href="/">
        <NoFound />
      </Link>
    </Container>
  );
};

const NoFound = styled.div`
  width: 100%;
  height: 100%;
  background: url("/images/404/404page_img.png") no-repeat center;
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100vh;
  background: #14141c;
`;

export default NotFound;
