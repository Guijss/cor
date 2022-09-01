import styled from 'styled-components';

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
    cursor: ${(props) => (props.mainPicked ? 'grab' : 'pointer')};
  }
`;

const PickMain = styled.span`
  position: relative;
  font-size: 2rem;
  opacity: ${(props) => props.opacity};
`;

const ColorBar = ({
  index,
  color,
  visible,
  width,
  mainPicked,
  setPickerVisible,
  setHoveringBar,
  children,
}) => {
  const handlePick = () => {
    if (!mainPicked) {
      setPickerVisible(true);
    }
  };

  return (
    <Bar
      width={visible === 1 ? width : 0}
      style={{
        backgroundColor: color.rgb.hex,
      }}
      mainPicked={mainPicked}
      onMouseEnter={() =>
        setHoveringBar((prev) => {
          let newArr = [...prev];
          newArr[index] = true;
          return newArr;
        })
      }
      onMouseLeave={() => {
        setHoveringBar((prev) => {
          let newArr = [...prev];
          newArr[index] = false;
          return newArr;
        });
      }}
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
