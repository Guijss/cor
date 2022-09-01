import { useContext } from 'react';
import styled from 'styled-components';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { eventsContext } from '../App';

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

const Lock = ({ index, setPickedRanges }) => {
  const { theme, setTheme } = useContext(eventsContext);

  const handleClick = () => {
    if (theme[index].isBarLocked) {
      setPickedRanges((prev) => {
        let newPickedRanges = [];
        let removedFirst = false;
        for (let i = 0; i < prev.length; i++) {
          let newEl = theme[index].color.range - theme[0].color.range;
          newEl = newEl >= 0 ? newEl : 12 + newEl;
          if (prev[i] === newEl && !removedFirst) {
            removedFirst = true;
            continue;
          }
          newPickedRanges.push(prev[i]);
        }
        return newPickedRanges;
      });
    } else {
      setPickedRanges((prev) => {
        let newEl = theme[index].color.range - theme[0].color.range;
        newEl = newEl >= 0 ? newEl : 12 + newEl;
        return [...prev, newEl];
      });
    }
    setTheme((prev) => {
      let newTheme = [...prev];
      newTheme[index] = {
        ...newTheme[index],
        isBarLocked: !newTheme[index].isBarLocked,
      };
      return newTheme;
    });
  };

  return (
    <LockIcon
      onClick={handleClick}
      style={{
        opacity: theme[index].hoveringBar ? 1 : 0.2,
        visibility:
          theme[index].color.rgb.hex !== theme[0].color.rgb.hex
            ? 'visible'
            : 'hidden',
      }}
    >
      {theme[index].isBarLocked ? (
        <FaLock size={30} color={theme[index].color.rgb.contrast} />
      ) : (
        <FaLockOpen size={30} color={theme[index].color.rgb.contrast} />
      )}
    </LockIcon>
  );
};

export default Lock;
