"use client";
import React from "react";
import styled from "styled-components";
import Sidebar from "@/components/section/settings/Sidebar";
import Footer from "@/components/common/footer/Footer";

const Main = styled.main`
  flex: 1;
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ComingSoonWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 1.2rem;
`;

const SettingsPage = () => {
  return (
    <div>
      <div style={{ display: "flex", height: "100vh", marginTop: "64px" }}>
        <Sidebar />
        <Main>
          <Title>계정 관리</Title>
          <ComingSoonWrapper>
            <p>페이지 준비중입니다.</p>
          </ComingSoonWrapper>
        </Main>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
