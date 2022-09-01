import { useState, useRef, useEffect, useContext } from 'react';
import { eventsContext } from '../App';
import styled from 'styled-components';
import SaturationSquare from './SaturationSquare';
import colorSetup from '../helpers/color';
import { FaCheck } from 'react-icons/fa';

const PickContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
  border: 2px solid black;
  left: 20%;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;

const Confirm = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;

const Wheel = styled.div`
  position: relative;
  background: conic-gradient(
    hsl(0, 100%, 50%),
    hsl(30, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(150, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(210, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(330, 100%, 50%),
    hsl(360, 100%, 50%)
  );
  width: 90%;
  height: 90%;
  min-width: 200px;
  min-height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WheelMask = styled.div`
  position: relative;
  width: 83%;
  height: 83%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Marker = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  width: 3px;
  height: 50%;
  transform-origin: bottom center;
`;

const Picker = ({ setMainPicked }) => {
  const { mousePos, dragging, theme, setTheme, setDragging, setPickerVisible } =
    useContext(eventsContext);
  const wheelRef = useRef(null);
  const squareRef = useRef(null);
  const markerRef = useRef(null);
  const [hue, setHue] = useState(0);
  const [bullsEyePos, setBullsEyePos] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    if (dragging.wheel) {
      const rect = wheelRef.current.getBoundingClientRect();
      const mouseVec = [mousePos.x, mousePos.y]; //current mouse position.
      const middleVec = [rect.x + rect.width / 2, rect.y + rect.height / 2]; //current wheel position (middle).
      const angleVec = [mousePos.x - middleVec[0], mousePos.y - middleVec[1]]; //vector subtraction, points from middle of circle to mouse cursor.
      let angle = 90 + (Math.atan2(angleVec[1], angleVec[0]) * 180) / Math.PI;
      angle = angle < 0 ? 360 + angle : angle;
      setHue(angle);
      const sqDistance =
        (middleVec[0] - mouseVec[0]) * (middleVec[0] - mouseVec[0]) +
        (middleVec[1] - mouseVec[1]) * (middleVec[1] - mouseVec[1]); //distance from mouse to middle of wheel.
      if (sqDistance >= ((0.87 * rect.width) / 2) * ((0.87 * rect.width) / 2)) {
        setTheme((prev) => {
          let newTheme = [...prev];
          newTheme[0] = {
            ...newTheme[0],
            color: colorSetup(angle, prev[0].color.hsb.s, prev[0].color.hsb.b),
          };
          return newTheme;
        });
      }
    } else if (dragging.sat) {
      const rect = squareRef.current.getBoundingClientRect();
      let xPos = mousePos.x - rect.x;
      let yPos = mousePos.y - rect.y;
      xPos =
        xPos < 0 ? (xPos = 0) : xPos > rect.width ? (xPos = rect.width) : xPos;
      yPos =
        yPos < 0
          ? (yPos = 0)
          : yPos > rect.height
          ? (yPos = rect.height)
          : yPos;
      const newBullsEye = {
        x: (100 * xPos) / rect.width,
        y: (100 * yPos) / rect.height,
      };
      setTheme((prev) => {
        let newTheme = [...prev];
        newTheme[0] = {
          ...newTheme[0],
          color: colorSetup(
            prev[0].color.hsb.h,
            newBullsEye.x,
            100 - newBullsEye.y
          ),
        };
        return newTheme;
      });
      setBullsEyePos(newBullsEye);
    } else {
    }
  }, [mousePos, dragging, setTheme]);

  useEffect(() => {
    if (dragging.sat || dragging.wheel) {
      return;
    }
    setHue(theme[0].color.hsb.h);
    setBullsEyePos({
      x: theme[0].color.hsb.s,
      y: 100 - theme[0].color.hsb.b,
    });
  }, [theme, dragging]);

  useEffect(() => {
    markerRef.current.style.transform = `rotate(${hue}deg)`;
  }, [hue]);

  const handleMouseDown = () => {
    const rect = wheelRef.current.getBoundingClientRect();
    const middleVec = [rect.x + rect.width / 2, rect.y + rect.height / 2]; //current wheel position (middle).
    const sqDistance =
      (middleVec[0] - mousePos.x) * (middleVec[0] - mousePos.x) +
      (middleVec[1] - mousePos.y) * (middleVec[1] - mousePos.y); //distance from mouse to middle of wheel.
    if (sqDistance >= ((0.87 * rect.width) / 2) * ((0.87 * rect.width) / 2)) {
      setDragging({ wheel: true, sat: false });
    }
  };

  const generateNewTheme = (c1) => {
    let h = c1.hsb.h;
    let newTheme = new Array(theme.length - 1);
    for (let i = 0; i < newTheme.length; i++) {
      let h1 =
        h + (Math.random() * 6 - 3) > 0
          ? h + ((Math.random() * 6 - 3) % 360)
          : 360 + h + (Math.random() * 6 - 3);
      let s1 = Math.random() * 100;
      let b1 = Math.random() * 100;
      newTheme[i] = colorSetup(h1, s1, b1);
    }
    newTheme = newTheme.sort((a, b) => a.hsb.b - b.hsb.b);
    return newTheme;
  };

  const handleConfirm = () => {
    setPickerVisible(false);
    setMainPicked(true);
    const newTheme = generateNewTheme(theme[0].color);
    setTheme((prev) =>
      prev.map((e, i) => (i === 0 ? e : { ...e, color: newTheme[i - 1] }))
    );
  };

  return (
    <PickContainer style={{ backgroundColor: 'beige' }}>
      <WheelContainer>
        <Wheel ref={wheelRef} onMouseDown={handleMouseDown}>
          <Marker ref={markerRef} />
          <WheelMask style={{ backgroundColor: 'beige' }}>
            <SaturationSquare
              hue={hue}
              contrast={theme[0].color.rgb.contrast}
              bullsEyePos={bullsEyePos}
              setDragging={setDragging}
              squareRef={squareRef}
            />
          </WheelMask>
        </Wheel>
      </WheelContainer>
      <Confirm onClick={handleConfirm}>
        <FaCheck size={50} />
      </Confirm>
    </PickContainer>
  );
};

export default Picker;
