import styled from "styled-components";
import AboutUsIcon from "./IconImage/AboutUs.png";
import OurProjectIcon from "./IconImage/OurProject.png";
import UniverseIcon from "./IconImage/Universe.png";
import MusicIcon from "./IconImage/Music.png";
import DiscordIcon from "./IconImage/Discord.png";
import SettingIcon from "./IconImage/Setting.png";
import { useState } from "react";
import { AboutUs } from "./AboutUs";
import { OurProject } from "./OurProject";
import { Music } from "./Music";
import { Setting } from "./Setting";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  /* width + gap / height + 2gap */
  width: 220px;
  height: 340px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  /* margin: 70px; */
`;
const IconBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  & figure {
    width: 60px;
    height: 60px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
const IconImg = styled.img`
  width: 100%;
  /* object-fit: cover; */
`;
const IconTitle = styled.p`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  font-family: "Silkscreen";
  letter-spacing: -1px;
`;

export function Main() {
  const [modalStack, setModalStack] = useState([]);
  const openModal = (type) => {
    if (!modalStack.includes(type)) {
      setModalStack((prev) => [
        ...prev.filter((item) => item.type !== type),
        { type, id: Date.now() },
      ]);
    } else {
      setModalStack((prev) => [
        ...prev.filter((item) => item.type !== type),
        { type, id: Date.now() },
      ]);
    }
  };
  const closeModal = (id) => {
    setModalStack((prev) => prev.filter((item) => item.id !== id));
  };

  // 디스코드 서버 링크
  const openDiscordServer = () => {
    window.open("https://discord.gg/8hGq5fsv");
  };

  return (
    <>
      <Container>
        <IconBox onClick={() => openModal("aboutUs")}>
          <figure>
            <IconImg src={AboutUsIcon} />
          </figure>
          <IconTitle>AboutUs</IconTitle>
        </IconBox>
        <IconBox onClick={() => openModal("ourProject")}>
          <figure>
            <IconImg src={OurProjectIcon} />
          </figure>
          <IconTitle>OurProject</IconTitle>
        </IconBox>
        <NavLink to="/universe">
          <IconBox>
            <figure>
              <IconImg src={UniverseIcon} />
            </figure>
            <IconTitle className="universe">Universe</IconTitle>
          </IconBox>
        </NavLink>
        <IconBox onClick={() => openModal("music")}>
          <figure>
            <IconImg src={MusicIcon} />
          </figure>
          <IconTitle>Music</IconTitle>
        </IconBox>
        <IconBox onClick={openDiscordServer}>
          <figure>
            <IconImg src={DiscordIcon} />
          </figure>
          <IconTitle>Discord</IconTitle>
        </IconBox>
        <IconBox onClick={() => openModal("setting")}>
          <figure>
            <IconImg src={SettingIcon} />
          </figure>
          <IconTitle>Setting</IconTitle>
        </IconBox>
      </Container>
      {modalStack.map(({ type, id }) => {
        if (type === "aboutUs") {
          return <AboutUs key={id} onAboutUsHide={() => closeModal(id)} />;
        } else if (type === "ourProject") {
          return (
            <OurProject key={id} onOurProjectHide={() => closeModal(id)} />
          );
        } else if (type === "music") {
          return <Music key={id} onMusicHide={() => closeModal(id)} />;
        } else if (type === "setting") {
          return <Setting key={id} onSettingHide={() => closeModal(id)} />;
        }
        return null;
      })}
    </>
  );
}
