import styled from 'styled-components';

const Wheel = styled.div`
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.7);
`;

const ColorDots = styled.div`
  position: absolute;
  width: 15%;
  height: 15%;
  border-radius: 50%;
  transform: rotate(${(props) => props.rot}deg) translateY(-250%);
`;

const WheelTetra = ({ col, diameter }) => {
  return (
    <Wheel
      style={{
        width: diameter,
        height: diameter,
      }}
    >
      <ColorDots
        rot={0}
        style={{ backgroundColor: `hsl(${col.hsb.h}, 100%, 40%)` }}
      />
      <ColorDots
        rot={90}
        style={{ backgroundColor: `hsl(${(col.hsb.h + 90) % 360}, 100%, 40%)` }}
      />
      <ColorDots
        rot={180}
        style={{
          backgroundColor: `hsl(${(col.hsb.h + 180) % 360}, 100%, 40%)`,
        }}
      />
      <ColorDots
        rot={270}
        style={{
          backgroundColor: `hsl(${(col.hsb.h + 270) % 360}, 100%, 40%)`,
        }}
      />
    </Wheel>
  );
};

export default WheelTetra;
