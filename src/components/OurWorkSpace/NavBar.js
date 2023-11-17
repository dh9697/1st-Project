import styled from "styled-components";
import FullScreenIcon from "./IconImage/FullScreen.png";
import { OpenWeather } from "./OpenWeather";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
  background-color: orange;
  width: 100%;
  height: 50px;
`;
const Nav = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const NavSection = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 50px;
`;
const Logo = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  & h2 {
    color: white;
    font-family: Black + Ops + One;
  }
`;
const LogoImgBox = styled.div`
  margin-top: 8px;
  width: 60px;
`;
const LogoImg = styled.img`
  width: 100%;
`;
const NavItem = styled.div`
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
`;
const NavItemSection = styled.div`
  border-right: 1px solid white;
  & :last-child {
    border-right: 0;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  & figure {
    width: 20px;
    height: 20px;
  }
`;
const IconImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Btn = styled.button`
  cursor: pointer;
`;

export function NavBar({ toggleFullScreen }) {
  // 날짜, 시각 표시
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formattedDate = currentDateTime
    .toLocaleDateString()
    .split(".")
    .slice(0, 3)
    .join(" -");
  const formattedTime = currentDateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const amPm = currentDateTime.getHours() >= 12 ? "PM " : "AM ";

  return (
    <>
      <Container>
        <Nav>
          <NavSection>
            <Logo>
              <LogoImgBox>
                <LogoImg
                  src={`${process.env.PUBLIC_URL}/Logo03.png`}
                  alt="Logo"
                />
              </LogoImgBox>
              <h2>Our Workspace</h2>
            </Logo>
          </NavSection>
          <NavSection>
            <NavItem>
              <NavItemSection>
                <figure>
                  <IconImg src={FullScreenIcon} />
                </figure>
                <Btn>
                  {amPm} {formattedTime}
                  <br />
                  {formattedDate}
                </Btn>
              </NavItemSection>
              <NavItemSection>
                <OpenWeather />
              </NavItemSection>
              <NavItemSection>
                <figure>
                  <IconImg src={FullScreenIcon} />
                </figure>
                <Btn onClick={toggleFullScreen}>FullScreen F11 기능</Btn>
              </NavItemSection>
            </NavItem>
          </NavSection>
        </Nav>
      </Container>
      <Outlet />
    </>
  );
}
