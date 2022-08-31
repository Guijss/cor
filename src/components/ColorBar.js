import { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaCopy, FaLock, FaLockOpen } from 'react-icons/fa';

const Bar = styled.div`
  position: relative;
  width: calc(100% * ${(props) => props.width});
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: width 0.5s ease-in, border-radius 0.5s ease-in;
  font-family: 'Fredoka', sans-serif;
  font-weight: bold;
  letter-spacing: 0.1rem;
  &:hover {
    cursor: ${(props) => (props.mainPicked ? 'default' : 'pointer')};
  }
`;

const HexText = styled.span`
  position: absolute;
  width: 100%;
  height: 3rem;
  font-size: 0.8rem;
  bottom: 0;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.1s ease-in 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const PickMain = styled.span`
  position: relative;
  font-size: 2rem;
  opacity: ${(props) => props.opacity};
`;

const LockIcon = styled.span`
  position: relative;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const ColorBar = ({
  idx,
  color,
  visible,
  width,
  mainPicked,
  isBarLocked,
  mainColorRange,
  setIsBarLocked,
  setPickerVisible,
  setPickedRanges,
}) => {
  const [copied, setCopied] = useState(false);
  const [hoveringBar, setHoveringBar] = useState(false);
  const [hoveringText, setHoveringText] = useState(false);

  const handlePick = () => {
    if (!mainPicked) {
      setPickerVisible(true);
    }
  };

  const handleClick = () => {
    if (idx === 0) {
      return;
    }
    setPickedRanges((prev) => [
      ...prev,
      (12 - mainColorRange + color.range) % 12,
    ]);
    setIsBarLocked((prev) => prev.map((e, i) => (i !== idx ? e : !e)));
  };

  const copy = () => {
    if (mainPicked) {
      navigator.clipboard.writeText(color.rgb.hex);
      setCopied(true);
    }
  };

  return (
    <Bar
      width={visible === 1 ? width : 0}
      style={{
        backgroundColor: color.rgb.hex,
      }}
      mainPicked={mainPicked}
      onMouseEnter={() => setHoveringBar(true)}
      onMouseLeave={() => {
        setHoveringBar(false);
      }}
      onClick={handlePick}
    >
      {mainPicked ? (
        <>
          <HexText
            style={{ color: color.rgb.contrast }}
            opacity={visible === 1 ? 1 : 0}
            onClick={copy}
            onMouseEnter={() => setHoveringText(true)}
            onMouseLeave={() => {
              setHoveringText(false);
              setCopied(false);
            }}
          >
            {hoveringText ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span style={{ margin: '5px 5px 0 0' }}>
                  {copied ? (
                    <FaCheck size={12} color={color.rgb.contrast} />
                  ) : (
                    <FaCopy size={12} color={color.rgb.contrast} />
                  )}
                </span>
                <span>Copy</span>
              </div>
            ) : (
              color.rgb.hex
            )}
          </HexText>
          <LockIcon
            onClick={handleClick}
            style={{
              opacity: hoveringBar ? 1 : 0.2,
              visibility: idx !== 0 ? 'visible' : 'hidden',
            }}
          >
            {isBarLocked[idx] ? (
              <FaLock size={30} color={color.rgb.contrast} />
            ) : (
              <FaLockOpen size={30} color={color.rgb.contrast} />
            )}
          </LockIcon>
        </>
      ) : (
        <PickMain
          style={{ color: color.rgb.contrast }}
          opacity={visible === 1 ? 1 : 0}
        >
          Pick your main color!
        </PickMain>
      )}
    </Bar>
  );
};

export default ColorBar;
