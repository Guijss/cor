import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SaturationSquare from './SaturationSquare';

const Wheel = styled.div`
  position: relative;
  background: conic-gradient(
    hsl(0, 100%, 50%),
    hsl(45, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(135, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(225, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(315, 100%, 50%),
    hsl(360, 100%, 50%)
  );
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WheelMask = styled.div`
  position: relative;
  background-color: #a4a4a4;
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

const CurrentColor = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 2rem;
`;

const Picker = () => {
  const wheelRef = useRef(null);
  const squareRef = useRef(null);
  const markerRef = useRef(null);
  const [hue, setHue] = useState(0);
  const [color, setColor] = useState({ h: 0, s: 100, b: 100 }); //hsb
  const [bullsEyePos, setBullsEyePos] = useState({ x: 50, y: 50 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState({ wheel: false, sat: false });

  useEffect(() => {
    const disableDrag = () => setDragging({ wheel: false, sat: false });
    const updateMouse = (e) => {
      e.preventDefault();

      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseup', disableDrag);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseup', disableDrag);
    };
  }, []);

  useEffect(() => {
    if (dragging.wheel) {
      const rect = wheelRef.current.getBoundingClientRect();
      const mouseVec = [mousePos.x, mousePos.y]; //current mouse position.
      const middleVec = [rect.x + rect.width / 2, rect.y + rect.height / 2]; //current wheel position (middle).
      const angleVec = [mousePos.x - middleVec[0], mousePos.y - middleVec[1]]; //vector subtraction, points from middle of circle to mouse cursor.
      let angle = 90 + (Math.atan2(angleVec[1], angleVec[0]) * 180) / Math.PI;
      angle = angle < 0 ? 360 + angle : angle;
      markerRef.current.style.transform = `rotate(${angle}deg)`;
      setHue(angle);
      const sqDistance =
        (middleVec[0] - mouseVec[0]) * (middleVec[0] - mouseVec[0]) +
        (middleVec[1] - mouseVec[1]) * (middleVec[1] - mouseVec[1]); //distance from mouse to middle of wheel.
      if (sqDistance >= ((0.87 * rect.width) / 2) * ((0.87 * rect.width) / 2)) {
        setColor((c) => {
          return { ...c, h: angle };
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
      setColor({
        h: hue,
        s: newBullsEye.x,
        b: 100 - newBullsEye.y,
      });
      setBullsEyePos(newBullsEye);
    }
  }, [mousePos, dragging, hue]);

  const hsbToHsl = (col) => {
    const sNormalized = col.s / 100;
    const bNormalized = col.b / 100;
    const l = bNormalized * (1 - sNormalized / 2);
    let sl = l === 0 || l === 1 ? 0 : (bNormalized - l) / Math.min(l, 1 - l);
    return `hsl(${col.h}, ${Math.round(sl * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleMouseDown = (e) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const middleVec = [rect.x + rect.width / 2, rect.y + rect.height / 2]; //current wheel position (middle).
    const sqDistance =
      (middleVec[0] - mousePos.x) * (middleVec[0] - mousePos.x) +
      (middleVec[1] - mousePos.y) * (middleVec[1] - mousePos.y); //distance from mouse to middle of wheel.
    if (sqDistance >= ((0.87 * rect.width) / 2) * ((0.87 * rect.width) / 2)) {
      setDragging({ wheel: true, sat: false });
    }
  };

  return (
    <>
      <Wheel ref={wheelRef} onMouseDown={handleMouseDown}>
        <Marker ref={markerRef} />
        <WheelMask>
          <SaturationSquare
            hue={hue}
            mousePos={mousePos}
            dragging={dragging}
            bullsEyePos={bullsEyePos}
            setDragging={setDragging}
            squareRef={squareRef}
          />
        </WheelMask>
      </Wheel>
      <CurrentColor style={{ backgroundColor: hsbToHsl(color) }} />
    </>
  );
};

export default Picker;
