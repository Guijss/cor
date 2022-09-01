import styled from 'styled-components';
import { FaLock, FaLockOpen } from 'react-icons/fa';

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

const Lock = ({
  index,
  isLocked,
  theme,
  hoveringBar,
  setPickedRanges,
  setIsBarLocked,
}) => {
  const handleClick = () => {
    if (isLocked) {
      setPickedRanges((prev) => {
        let newPickedRanges = [];
        let removedFirst = false;
        for (let i = 0; i < prev.length; i++) {
          if (
            prev[i] ===
              (12 - theme.c1.range + theme[`c${index + 1}`].range) % 12 &&
            !removedFirst
          ) {
            removedFirst = true;
            continue;
          }
          newPickedRanges.push(prev[i]);
        }
        return newPickedRanges;
      });
    } else {
      setPickedRanges((prev) => [
        ...prev,
        (12 - theme.c1.range + theme[`c${index + 1}`].range) % 12,
      ]);
    }

    setIsBarLocked((prev) => prev.map((e, i) => (i !== index ? e : !e)));
  };

  return (
    <LockIcon
      onClick={handleClick}
      style={{
        opacity: hoveringBar ? 1 : 0.2,
        visibility:
          theme[`c${index + 1}`].rgb.hex !== theme.c1.rgb.hex
            ? 'visible'
            : 'hidden',
      }}
    >
      {isLocked ? (
        <FaLock size={30} color={theme[`c${index + 1}`].rgb.contrast} />
      ) : (
        <FaLockOpen size={30} color={theme[`c${index + 1}`].rgb.contrast} />
      )}
    </LockIcon>
  );
};

export default Lock;
