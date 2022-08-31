import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  position: relative;
  width: 50%;
  height: 20%;
  background-color: beige; //${(props) => props.bgCol};
  border-radius: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid black;
`;

const NameWheel = styled.div`
  position: relative;
  width: 16.66%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  font-family: 'Fredoka One', cursive;
  color: black;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
`;

const ThemeDisplay = ({ theme, availableSchemes }) => {
  const displayRef = useRef(null);
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const setSize = () => {
      setDisplaySize({
        w: displayRef.current.clientWidth,
        h: displayRef.current.clientHeight,
      });
    };
    setSize();
    window.addEventListener('resize', setSize);

    return () => {
      window.removeEventListener('resize', setSize);
    };
  }, [setDisplaySize]);

  return (
    <DisplayContainer ref={displayRef}>
      {availableSchemes.map((e, i) => (
        <NameWheel key={i}>
          <span>{e.name}</span>
          <e.component
            col={theme.c1}
            displaySize={displaySize}
            maskCol="beige"
          />
        </NameWheel>
      ))}
    </DisplayContainer>
  );
};

export default ThemeDisplay;

//Base Wheel:
// backgroundImage: `conic-gradient(
//     hsla(${col.hsb.h}, 100%, 50%, 1) 0deg,
//     hsla(${col.hsb.h}, 100%, 50%, 1) 15deg,
//     hsla(${(col.hsb.h + 30) % 360}, 100%, 50%, 1) 15deg,
//     hsla(${(col.hsb.h + 30) % 360}, 100%, 50%, 1) ${15 + 30}deg,
//     hsla(${(col.hsb.h + 60) % 360}, 100%, 50%, 1) ${15 + 30}deg,
//     hsla(${(col.hsb.h + 60) % 360}, 100%, 50%, 1) ${15 + 30 * 2}deg,
//     hsla(${(col.hsb.h + 90) % 360}, 100%, 50%, 1) ${15 + 30 * 2}deg,
//     hsla(${(col.hsb.h + 90) % 360}, 100%, 50%, 1) ${15 + 30 * 3}deg,
//     hsla(${(col.hsb.h + 120) % 360}, 100%, 50%, 1) ${15 + 30 * 3}deg,
//     hsla(${(col.hsb.h + 120) % 360}, 100%, 50%, 1) ${15 + 30 * 4}deg,
//     hsla(${(col.hsb.h + 150) % 360}, 100%, 50%, 1) ${15 + 30 * 4}deg,
//     hsla(${(col.hsb.h + 150) % 360}, 100%, 50%, 1) ${15 + 30 * 5}deg,
//     hsla(${(col.hsb.h + 180) % 360}, 100%, 50%, 1) ${15 + 30 * 5}deg,
//     hsla(${(col.hsb.h + 180) % 360}, 100%, 50%, 1) ${15 + 30 * 6}deg,
//     hsla(${(col.hsb.h + 210) % 360}, 100%, 50%, 1) ${15 + 30 * 6}deg,
//     hsla(${(col.hsb.h + 210) % 360}, 100%, 50%, 1) ${15 + 30 * 7}deg,
//     hsla(${(col.hsb.h + 240) % 360}, 100%, 50%, 1) ${15 + 30 * 7}deg,
//     hsla(${(col.hsb.h + 240) % 360}, 100%, 50%, 1) ${15 + 30 * 8}deg,
//     hsla(${(col.hsb.h + 270) % 360}, 100%, 50%, 1) ${15 + 30 * 8}deg,
//     hsla(${(col.hsb.h + 270) % 360}, 100%, 50%, 1) ${15 + 30 * 9}deg,
//     hsla(${(col.hsb.h + 300) % 360}, 100%, 50%, 1) ${15 + 30 * 9}deg,
//     hsla(${(col.hsb.h + 300) % 360}, 100%, 50%, 1) ${15 + 30 * 10}deg,
//     hsla(${(col.hsb.h + 330) % 360}, 100%, 50%, 1) ${15 + 30 * 10}deg,
//     hsla(${(col.hsb.h + 330) % 360}, 100%, 50%, 1) ${15 + 30 * 11}deg,
//     hsla(${col.hsb.h}, 100%, 50%, 1) ${15 + 30 * 11}deg,
//     hsla(${col.hsb.h}, 100%, 50%, 1) ${15 + 30 * 12}deg
//   )`
