import { useState, useEffect, useRef, createContext } from 'react';
import styled from 'styled-components';
import Picker from './components/Picker';
import colorSetup from './helpers/color';
import ColorBar from './components/ColorBar';
import ThemeDisplay from './components/ThemeDisplay';
import schemes from './helpers/schemes';
import HexText from './components/HexText';
import Lock from './components/Lock';
import initialTheme from './helpers/initialTheme';

export const eventsContext = createContext();

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: 'Fredoka One', cursive;
`;

const Banner = styled.div`
  position: relative;
  height: 10%;
  width: 100%;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.75);
  z-index: 99;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  position: absolute;
  left: 0;
  margin: 5rem;
  font-size: 3rem;
  @media only screen and (max-width: 768px) {
    left: auto;
    margin: 0;
  }
`;

const Title = styled.span`
  @media only screen and (max-width: 768px) {
    visibility: hidden;
  }
`;

const Page = styled.div`
  position: relative;
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ColorBarContainer = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 1rem;
  height: 70%;
  width: 70%;
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid black;
  &:hover {
    cursor: ${(props) =>
      !props.mainPicked ? 'pointer' : props.isDragging ? 'unset' : 'grab'};
  }
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

function App() {
  const barsRef = useRef(null);
  const pageRef = useRef(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const [isBarVisible, setIsBarVisible] = useState(
    new Array(6).fill(0).map((e, i) => (i === 0 ? 1 : 0))
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState({
    wheel: false,
    sat: false,
  });
  const [barWidth, setBarWidth] = useState(1);
  const [mainPicked, setMainPicked] = useState(false);
  const [availableSchemes, setAvailableSchemes] = useState(schemes);
  const [pickedRanges, setPickedRanges] = useState([]);

  useEffect(() => {
    //trim out impossible schemes after color pick.
    setAvailableSchemes(
      schemes.filter((e) => {
        let found = true;
        for (let i = 0; i < pickedRanges.length; i++) {
          if (!e.ranges.includes(pickedRanges[i])) {
            found = false;
            break;
          }
        }
        return found;
      })
    );
  }, [pickedRanges]);

  useEffect(() => {
    const pickNewCol = () => {
      const chosenScheme =
        availableSchemes[Math.floor(Math.random() * availableSchemes.length)];
      const index = Math.floor(Math.random() * chosenScheme.ranges.length);
      let chosenRange = chosenScheme.ranges[index];
      chosenRange = (theme[0].color.range + chosenRange) % 12;
      const minVal = chosenRange * 30 - 15;
      let chosenHue = Math.random() * 30 + minVal; //30 deg for each color range.
      chosenHue = chosenHue < 0 ? 360 + chosenHue : chosenHue % 360;
      const col = colorSetup(
        chosenHue,
        Math.random() * 100,
        Math.random() * 100
      );
      return col.rgb.hex !== theme[0].color.rgb.hex ? col : pickNewCol();
    };
    const keyUpHandler = (e) => {
      if (!mainPicked) {
        return;
      }
      if (e.code === 'Space') {
        setTheme((prev) =>
          prev.map((e) => (e.isBarLocked ? e : { ...e, color: pickNewCol() }))
        );
      }
    };
    const disableDrag = () => {
      setDragging({ wheel: false, sat: false });
      setTheme((prev) =>
        prev.map((e) => {
          return { ...e, draggingBar: false };
        })
      );
    };
    const updateMouse = (e) => {
      e.preventDefault();
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (mainPicked) {
      setIsBarVisible([1, 1, 1, 1, 1, 1]);
    }
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseup', disableDrag);
    window.addEventListener('keyup', keyUpHandler);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseup', disableDrag);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [availableSchemes, mainPicked, theme]);

  useEffect(() => {
    const reducedArr = isBarVisible.reduce((a, b) => a + b);
    if (reducedArr !== 0) {
      setBarWidth(1 / reducedArr);
    }
  }, [isBarVisible]);

  useEffect(() => {
    setTheme((prev) => {
      let index = 0;
      let isDragging = false;
      prev.forEach((e, i) => {
        if (e.draggingBar) {
          index = i;
          isDragging = true;
        }
      });
      if (index === 0 || isDragging === false) {
        return prev;
      }
      const rect = barsRef.current.getBoundingClientRect();
      const barMin = rect.x + index * (rect.width / 6);
      const barMax = barMin + rect.width / 6;
      if (mousePos.x < barMin && index > 1) {
        let newTheme = [...prev];
        let tempEl = newTheme[index - 1];
        newTheme[index - 1] = newTheme[index];
        newTheme[index] = tempEl;
        newTheme[index - 1].hoveringBar = true;
        newTheme[index].hoveringBar = false;
        return newTheme;
      } else if (mousePos.x > barMax && index < 5) {
        let newTheme = [...prev];
        let tempEl = newTheme[index + 1];
        newTheme[index + 1] = newTheme[index];
        newTheme[index] = tempEl;
        newTheme[index + 1].hoveringBar = true;
        newTheme[index].hoveringBar = false;
        return newTheme;
      }
      return prev;
    });
  }, [mousePos]);

  useEffect(() => {
    if (
      theme[0].draggingBar ||
      theme[1].draggingBar ||
      theme[2].draggingBar ||
      theme[3].draggingBar ||
      theme[4].draggingBar ||
      theme[5].draggingBar
    ) {
      pageRef.current.style.cursor = 'grabbing';
    } else {
      pageRef.current.style.cursor = 'default';
    }
  }, [theme]);

  return (
    <PageContainer ref={pageRef}>
      <Banner
        style={{
          color: theme[1].color.rgb.contrast,
          backgroundColor: theme[1].color.rgb.hex,
        }}
      >
        <Logo>Cor</Logo>
        <Title>Your color scheme tool!</Title>
      </Banner>
      <Page
        style={{
          backgroundColor: theme[0].color.rgb.hex,
          backgroundImage: `linear-gradient(to left, ${
            theme[0].color.rgb.hex
          }, rgb(${Math.min(theme[0].color.rgb.r * 1.7, 255)}, ${Math.min(
            theme[0].color.rgb.g * 1.7,
            255
          )}, ${Math.min(theme[0].color.rgb.b * 1.7, 255)})`,
        }}
      >
        <ThemeDisplay theme={theme} availableSchemes={availableSchemes} />
        <eventsContext.Provider
          value={{
            mousePos,
            dragging,
            theme,
            setTheme,
            setDragging,
            setPickerVisible,
          }}
        >
          <ColorBarContainer
            ref={barsRef}
            mainPicked={mainPicked}
            isDragging={
              theme[0].draggingBar ||
              theme[1].draggingBar ||
              theme[2].draggingBar ||
              theme[3].draggingBar ||
              theme[4].draggingBar ||
              theme[5].draggingBar
            }
          >
            {theme.map((e, i) => (
              <ColorBar
                key={i}
                index={i}
                color={e.color}
                visible={isBarVisible[i]}
                width={barWidth}
                mainPicked={mainPicked}
              >
                <HexText color={e.color} visible={isBarVisible[i]} />
                <Lock
                  index={i}
                  pickedRanges={pickedRanges}
                  setPickedRanges={setPickedRanges}
                />
              </ColorBar>
            ))}
          </ColorBarContainer>
          {pickerVisible && <Picker setMainPicked={setMainPicked} />}
        </eventsContext.Provider>
      </Page>
    </PageContainer>
  );
}

export default App;
