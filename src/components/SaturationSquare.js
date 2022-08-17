import styled from 'styled-components';

const SatSquare = styled.div`
  position: absolute;
  width: calc(100% / 1.43);
  height: calc(100% / 1.43);
  pointer-events: none;
`;

const SatMaskW = styled.div`
  position: absolute;
  background-image: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0));
  width: calc(100% / 1.43);
  height: calc(100% / 1.43);
  pointer-events: none;
`;

const SatMaskB = styled.div`
  position: absolute;
  background-image: linear-gradient(to top, #000000, rgba(0, 0, 0, 0));
  width: calc(100% / 1.43);
  height: calc(100% / 1.43);
`;

const BullsEye = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid black;
  z-index: 10;
`;

const SaturationSquare = (props) => {
  const handleMouseDown = () => {
    props.setDragging({ wheel: false, sat: true });
  };

  return (
    <>
      <SatSquare
        ref={props.squareRef}
        style={{ backgroundColor: `hsl(${props.hue}, 100%, 50%)` }}
      >
        <BullsEye
          bullsEyePos={props.bullsEyePos}
          style={{
            top: `calc(${props.bullsEyePos.y}% - 2px)`,
            left: `calc(${props.bullsEyePos.x}% - 2px)`,
          }}
        />
      </SatSquare>
      <SatMaskW />
      <SatMaskB onMouseDown={handleMouseDown} />
    </>
  );
};

export default SaturationSquare;
