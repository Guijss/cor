import { useContext } from 'react';
import styled from 'styled-components';
import { eventsContext } from '../App';

const Bar = styled.div`
  position: relative;
  width: calc(100% * ${(props) => props.width});
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: width 0.5s ease-in, border-radius 0.5s ease-in;
  letter-spacing: 0.1rem;
`;

const PickMain = styled.span`
  position: relative;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => props.opacity};
  @media only screen and (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

const ColorBar = ({ index, color, visible, width, mainPicked, children }) => {
  // TODO! add touch events to bars.
  const { setPickerVisible, setTheme } = useContext(eventsContext);
  const handlePick = () => {
    if (!mainPicked) {
      setPickerVisible(true);
    }
  };

  const handleMouseEvent = (key, state) => {
    setTheme((prev) => {
      let newTheme = [...prev];
      newTheme[index] = { ...newTheme[index], [key]: state };
      return newTheme;
    });
  };

  return (
    <Bar
      width={visible === 1 ? width : 0}
      style={{
        backgroundColor: color.rgb.hex,
      }}
      mainPicked={mainPicked}
      onMouseEnter={() => handleMouseEvent('hoveringBar', true)}
      onMouseLeave={() => handleMouseEvent('hoveringBar', false)}
      onMouseDown={() => handleMouseEvent('draggingBar', true)}
      onClick={handlePick}
    >
      {mainPicked ? (
        children
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
