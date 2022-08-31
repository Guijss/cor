import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Picker from './components/Picker';
import colorSetup from './helpers/color';
import ColorBar from './components/ColorBar';
import ThemeDisplay from './components/ThemeDisplay';
import schemes from './helpers/schemes';

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Banner = styled.div`
  position: relative;
  height: 10%;
  width: 100%;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.75);
  z-index: 99;
  font-family: 'Fredoka One', cursive;
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
`;

function App() {
  const barsRef = useRef(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [theme, setTheme] = useState({
    c1: colorSetup(213, 84, 20),
    c2: colorSetup(217, 68, 26),
    c3: colorSetup(214, 52, 38),
    c4: colorSetup(213, 38, 50),
    c5: colorSetup(225, 19, 57),
    c6: colorSetup(225, 35, 32),
  });
  const [isBarVisible, setIsBarVisible] = useState(
    new Array(6).fill(0).map((e, i) => (i === 0 ? 1 : 0))
  );

  const [barWidth, setBarWidth] = useState(1);
  const [mainPicked, setMainPicked] = useState(false);
  const [availableSchemes, setAvailableSchemes] = useState(schemes);
  const [pickedRanges, setPickedRanges] = useState([]);
  const [isBarLocked, setIsBarLocked] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setAvailableSchemes((prev) =>
        prev.filter((e) => {
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
    }
  }, [pickedRanges, theme.c1.range]);

  useEffect(() => {
    const pickNewCol = () => {
      const chosenScheme =
        availableSchemes[Math.floor(Math.random() * availableSchemes.length)];
      const index = Math.floor(Math.random() * chosenScheme.ranges.length);
      let chosenRange = chosenScheme.ranges[index];
      chosenRange = (12 - theme.c1.range + chosenRange) % 12;
      const minVal = chosenRange * 30 - 15;
      let chosenHue = Math.random() * 30 + minVal; //30 deg for each color range.
      chosenHue = chosenHue < 0 ? 360 + chosenHue : chosenHue % 360;
      return colorSetup(chosenHue, Math.random() * 100, Math.random() * 100);
    };
    const keyUpHandler = (e) => {
      if (!mainPicked) {
        return;
      }
      if (e.code === 'Space') {
        isBarLocked.forEach((e, i) => {
          if (!e) {
            setTheme((prev) => {
              return { ...prev, [`c${i + 1}`]: pickNewCol() };
            });
          }
        });
      }
    };
    window.addEventListener('keyup', keyUpHandler);
    return () => {
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [isBarLocked, availableSchemes, mainPicked, theme.c1.range]);

  useEffect(() => {
    const reducedArr = isBarVisible.reduce((a, b) => a + b);
    if (reducedArr !== 0) {
      setBarWidth(1 / reducedArr);
    }
  }, [isBarVisible]);

  useEffect(() => {
    if (mainPicked) {
      setIsBarVisible([1, 1, 1, 1, 1, 1]);
    }
  }, [mainPicked]);

  return (
    <PageContainer>
      <Banner
        style={{
          color: theme.c2.rgb.contrast,
          backgroundColor: theme.c2.rgb.hex,
        }}
      >
        <Logo>Cor</Logo>
        <Title>Your color scheme tool!</Title>
      </Banner>
      <Page
        style={{
          backgroundColor: theme.c1.rgb.hex,
          backgroundImage: `linear-gradient(to left, ${
            theme.c1.rgb.hex
          }, rgb(${Math.min(theme.c1.rgb.r * 1.7, 255)}, ${Math.min(
            theme.c1.rgb.g * 1.7,
            255
          )}, ${Math.min(theme.c1.rgb.b * 1.7, 255)})`,
        }}
      >
        <ThemeDisplay theme={theme} availableSchemes={availableSchemes} />
        <ColorBarContainer ref={barsRef}>
          {Object.entries(theme).map((e, i, a) => (
            <ColorBar
              key={i}
              idx={i}
              color={e[1]}
              len={a.length}
              visible={isBarVisible[i]}
              width={barWidth}
              mainPicked={mainPicked}
              isBarLocked={isBarLocked}
              mainColorRange={theme.c1.range}
              setIsBarLocked={setIsBarLocked}
              setPickerVisible={setPickerVisible}
              setPickedRanges={setPickedRanges}
            />
          ))}
        </ColorBarContainer>
        {pickerVisible && (
          <Picker
            theme={theme}
            setTheme={setTheme}
            setMainPicked={setMainPicked}
            setPickerVisible={setPickerVisible}
          />
        )}
      </Page>
    </PageContainer>
  );
}

export default App;
