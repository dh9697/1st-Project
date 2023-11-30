import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const Container = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
`;
const Topbar = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10%;
`;
const Tabs = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
`;
// const Tab = styled(NavLink)``; 함수 안에 써줌
const MyAccount = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
`;
const DashboardNavLink = styled(NavLink)`
  background-color: red;
  text-decoration: none;
  color: black;
`;
const StyledIcon = styled(Icon)`
  font-size: 1.3rem;
`;

const Search = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blue;
`;
const SearchInput = styled.input``;
const SearchBtn = styled(NavLink)`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;
const Alerts = styled.div`
  opacity: ${({ isAlertsVisible }) =>
    isAlertsVisible ? { opacity: 1 } : { opacity: 0 }};
  width: 300px;
  height: 300px;
  border-top: 3px solid #ddd;
  border-left: 3px solid gray;
  border-bottom: 3px solid rgb(27, 36, 71);
  border-right: 3px solid rgb(27, 36, 71);
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;
const AlertsTopBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: rgb(27, 36, 71);
  position: relative;
`;
const AlertsLogo = styled.div`
  width: 100%;
  height: 100%;
  font-size: 21px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  & .waringIcon {
    color: gold;
  }
`;
const XBtn = styled.button`
  position: absolute;
  right: 3px;
  top: 3px;
  width: 23px;
  height: 23px;
  cursor: pointer;
  & .xIcon {
    width: 100%;
    height: 100%;
  }
`;
const AlertsContent = styled.div`
  background-color: darkgray;
  width: 100%;
  height: calc(100% - 30px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  /* text를 박스 크기에 맞게 늘림 */
  /* text-align: justify; */
  font-size: 15px;
`;
const AlertsText = styled.p`
  font-weight: 600;
  text-align: center;
  line-height: 1.7;
`;
const AlertsBtn = styled.button`
  cursor: pointer;
  color: white;
  background-color: rgb(27, 36, 71);
  padding: 5px 10px;
  border-radius: 5px;
`;

export function UniverseWindow() {
  // 해당 경로일 때 스타일링을 위해
  const location = useLocation();
  const Tab = styled(NavLink)`
    width: 20%;
    background-color: ${({ to }) =>
      location.pathname === to ? "rgb(27, 36, 71)" : "white"};
    color: ${({ to }) => (location.pathname === to ? "white" : "black")};
    font-weight: ${({ to }) => (location.pathname === to ? 600 : 400)};

    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
    text-decoration: none;
    /* 박스 폰트 정렬 */
    padding-top: 3px;
    &:hover {
      /* 폰트까지 opacity 적용됨 */
      /* opacity: 0.5; */
      /* rgba로 배경에만 opacity 부여 */
      background-color: rgba(27, 36, 71, 0.8);
      cursor: pointer;
      font-weight: 600;
      color: white;
    }
  `;

  // 경고창 확인 눌렀을 때 home으로 이동 취소 눌렀을 때 변화 x
  const navigate = useNavigate();
  const [isAlertsVisible, setIsAlertsVisible] = useState(false);

  // const [login, setLogin] = useState(false);

  const onClickLogout = () => {
    setIsAlertsVisible(true);
  };
  const handleConfirm = () => {
    navigate("/");
    setIsAlertsVisible(false);
  };
  const handleCancel = () => {
    setIsAlertsVisible(false);
  };

  return (
    <>
      {/* {!login ? (
        <Navigate to="/universe/login" />
      ) : ( */}
      <Container>
        <Topbar>
          <Tabs>
            <Tab to="/universe">Universe</Tab>
            <Tab to="/universe/archive">Archive</Tab>
            <Tab to="/universe/bin">Bin</Tab>
            <Tab onClick={onClickLogout}>Logout</Tab>
          </Tabs>
          <Tabs className="control">
            <Search>
              <SearchInput placeholder="Search by Nickname" />
              <SearchBtn to="/universe/search">
                <Icon className="XIcon" icon="pixelarticons:search" />
              </SearchBtn>
            </Search>
            <MyAccount>
              <DashboardNavLink to="/universe/dashboard">
                <StyledIcon icon="pixelarticons:user" />
                Eyhadk님
              </DashboardNavLink>
            </MyAccount>
          </Tabs>
        </Topbar>

        {isAlertsVisible && (
          <Alerts>
            <AlertsTopBar>
              <AlertsLogo>
                <Icon className="waringIcon" icon="ic:round-warning" />
                <p>Alert</p>
              </AlertsLogo>
              <XBtn onClick={handleCancel}>
                <Icon className="xIcon" icon="pixelarticons:close" />
              </XBtn>
            </AlertsTopBar>
            <AlertsContent>
              <AlertsText>
                When you log out,<br></br>you will return to home screen.
                <br></br>Are you sure you want to log out?
              </AlertsText>
              <AlertsBtn onClick={handleConfirm}>Yes</AlertsBtn>
            </AlertsContent>
          </Alerts>
        )}
      </Container>
      {/* )} */}
      <Outlet />
    </>
  );
}
