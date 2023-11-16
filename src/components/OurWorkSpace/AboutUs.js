import styled from "styled-components";
import AboutUsIcon from "./IconImage/AboutUs.png";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 300px;
  height: 300px;
  border: 2px solid gray;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;
const PopupBox = styled.div`
  width: 100%;
  height: 100%;
`;
const PopupNavBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;
  position: relative;
  cursor: grab;
`;
const Logo = styled.div`
  width: 100px;
  height: 100%;
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
`;
const LogoImg = styled.div`
  width: 1.5rem;
  /* img 가운데 정렬하기 위해 flex 줘 봤는데 됨 이유는 모름 나중에 보기 */
  display: flex;
  & img {
    width: 100%;
  }
`;
const XBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 100%;
`;
const PopupHome = styled.div`
  background-color: red;
  width: 100%;
  /* PopupNavBar height 30px */
  height: calc(100% - 30px);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Title = styled.h2`
  background-color: pink;
`;
const Content = styled.p`
  background-color: gold;
  /* p 태그의 text는 크기에 상관없이 글자가 튀어져 나감 때문에 word-wrap의 break-word 속성 부여 */
  word-wrap: break-word;
`;
const Btn = styled.button`
  cursor: pointer;
`;
export function AboutUs({ onAboutUsHide }) {
  //  container 클릭했을 때 z-index값을 최상위로 하기 위해
  //  const [zIndex, setZIndex] = useState(1);
  //  const toFront = () =>{
  //  setZIndex((prev)=> prev+1)ㄴ
  //  };
  //  Container에 style={{zIndex}} 부여하고 mouseDown 함수에 toFront() 기능 넣어주면
  //  클릭에 따라 z-inex 값이 증가하면서 원하는 화면이 구현되지만 클릭 수에 의존하여 다른 방법 모색

  // PopupNavBar로 드래그 하기 위해
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({
    top: window.innerHeight / 2 - 150,
    left: window.innerWidth / 2 - 150,
    // ( top: 50%;, left: 50% === /2 ) => 같은 메커니즘: 가운데 오게 하고,
    // ( transform: translate(-50%,-50%) === -150px ) => 같은 메커니즘: container가 300px이기 때문에
  });
  const mouseDown = (e) => {
    // 기본 drag 동작 방지
    e.preventDefault();
    setDragging(true);
  };
  const mouseUp = (e) => {
    setDragging(false);
  };
  const mouseMove = (e) => {
    if (dragging) {
      setPosition((prev) => ({
        top: prev.top + e.movementY,
        left: prev.left + e.movementX,
      }));
    }
    // dragging 화면 제한하기
    // if (dragging) {
    //   const containerWidth = 300;
    //   const containerHeight = 300;

    //   const newTop = Math.min(
    //     Math.max(position.top + e.movementY, 0),
    //     window.innerHeight - containerHeight
    //   );
    //   const newLeft = Math.min(
    //     Math.max(position.left + e.movementX, 0),
    //     window.innerWidth - containerWidth
    //   );
    //   setPosition({ left: newLeft, top: newTop });
    // }
  };
  useEffect(() => {
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mousemove", mouseMove);

    return () => {
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("mousemove", mouseMove);
    };
  }, [dragging]);

  return (
    <>
      <Container top={position.top} left={position.left}>
        <PopupBox>
          <PopupNavBar onMouseDown={mouseDown}>
            <Logo>
              <LogoImg>
                <img src={AboutUsIcon} />
              </LogoImg>
              <p>AboutUs</p>
            </Logo>
            <XBtn onClick={onAboutUsHide}>X</XBtn>
          </PopupNavBar>
          <PopupHome>
            <Title>About Us</Title>
            <Content>
              zzzzzzzzzzzzzzzzzzzzzsljdglsjdgljsgdzzzzzzzzzzzzzlsdjgljsgljzzzzzzzdsfsfd32ljzzzz
            </Content>
            <Btn>Button</Btn>
          </PopupHome>
        </PopupBox>
      </Container>
    </>
  );
}
