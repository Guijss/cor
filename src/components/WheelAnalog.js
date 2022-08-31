import styled from 'styled-components';

const WheelMask = styled.div`
  position: relative;
  width: 20%;
  height: 20%;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.7);
`;

const Wheel = styled.div`
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.7);
`;

const WheelAnalog = ({ col, displaySize, maskCol }) => {
  return (
    <Wheel
      style={{
        backgroundImage: `conic-gradient(
    hsla(${col.hsb.h}, 100%, 40%, 1) 0deg,
    hsla(${col.hsb.h}, 100%, 40%, 1) 15deg,
    hsla(${(col.hsb.h + 30) % 360}, 100%, 40%, 1) 16deg,
    hsla(${(col.hsb.h + 30) % 360}, 100%, 40%, 1) ${15 + 30}deg,
    hsla(${(col.hsb.h + 60) % 360}, 100%, 40%, 0.2) ${16 + 30}deg,
    hsla(${(col.hsb.h + 60) % 360}, 100%, 40%, 0.2) ${15 + 30 * 2}deg,
    hsla(${(col.hsb.h + 90) % 360}, 100%, 40%, 0.2) ${16 + 30 * 2}deg,
    hsla(${(col.hsb.h + 90) % 360}, 100%, 40%, 0.2) ${15 + 30 * 3}deg,
    hsla(${(col.hsb.h + 120) % 360}, 100%, 40%, 0.2) ${16 + 30 * 3}deg,
    hsla(${(col.hsb.h + 120) % 360}, 100%, 40%, 0.2) ${15 + 30 * 4}deg,
    hsla(${(col.hsb.h + 150) % 360}, 100%, 40%, 0.2) ${16 + 30 * 4}deg,
    hsla(${(col.hsb.h + 150) % 360}, 100%, 40%, 0.2) ${15 + 30 * 5}deg,
    hsla(${(col.hsb.h + 180) % 360}, 100%, 40%, 0.2) ${16 + 30 * 5}deg,
    hsla(${(col.hsb.h + 180) % 360}, 100%, 40%, 0.2) ${15 + 30 * 6}deg,
    hsla(${(col.hsb.h + 210) % 360}, 100%, 40%, 0.2) ${16 + 30 * 6}deg,
    hsla(${(col.hsb.h + 210) % 360}, 100%, 40%, 0.2) ${15 + 30 * 7}deg,
    hsla(${(col.hsb.h + 240) % 360}, 100%, 40%, 0.2) ${16 + 30 * 7}deg,
    hsla(${(col.hsb.h + 240) % 360}, 100%, 40%, 0.2) ${15 + 30 * 8}deg,
    hsla(${(col.hsb.h + 270) % 360}, 100%, 40%, 0.2) ${16 + 30 * 8}deg,
    hsla(${(col.hsb.h + 270) % 360}, 100%, 40%, 0.2) ${15 + 30 * 9}deg,
    hsla(${(col.hsb.h + 300) % 360}, 100%, 40%, 0.2) ${16 + 30 * 9}deg,
    hsla(${(col.hsb.h + 300) % 360}, 100%, 40%, 0.2) ${15 + 30 * 10}deg,
    hsla(${(col.hsb.h + 330) % 360}, 100%, 40%, 1) ${16 + 30 * 10}deg,
    hsla(${(col.hsb.h + 330) % 360}, 100%, 40%, 1) ${15 + 30 * 11}deg,
    hsla(${col.hsb.h}, 100%, 40%, 1) ${16 + 30 * 11}deg,
    hsla(${col.hsb.h}, 100%, 40%, 1) ${15 + 30 * 12}deg
  )`,
        width: displaySize.h * 0.7,
        height: displaySize.h * 0.7,
      }}
    >
      <WheelMask style={{ backgroundColor: maskCol }} />
    </Wheel>
  );
};

export default WheelAnalog;
