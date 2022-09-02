import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  position: relative;
  width: 50%;
  height: 20%;
  background-color: beige;
  border-radius: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid black;
  font-size: 1.3rem;
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const NameWheel = styled.div`
  position: relative;
  width: 16.66%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  color: black;
  font-size: 0.8rem;
  @media only screen and (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const Name = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
      {availableSchemes.length === 0 ? (
        <span>No possible color scheme with the current selected colors.</span>
      ) : (
        availableSchemes.map((e, i) => (
          <NameWheel key={i}>
            <Name
              style={{
                width: Math.min(displaySize.w / 6.5, displaySize.h * 0.7),
                height: `calc(75% - ${Math.min(
                  displaySize.w / 6.5,
                  displaySize.h * 0.7
                )}px)`,
              }}
            >
              {e.name}
            </Name>
            <e.component
              col={theme[0].color}
              diameter={Math.min(displaySize.w / 6.5, displaySize.h * 0.7)}
            />
          </NameWheel>
        ))
      )}
    </DisplayContainer>
  );
};

export default ThemeDisplay;
