import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheck, FaCopy } from 'react-icons/fa';

const Bar = styled.div`
  position: relative;
  width: 20%;
  height: 100%;
  display: flex;
  border-radius: ${(props) => props.radius};
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`;

const HexText = styled.span`
  position: relative;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  font-family: 'Fredoka', sans-serif;
`;

const ColorBar = ({ idx, color, len }) => {
  const [copied, setCopied] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [borderRadius, setBorderRadius] = useState('0 0 0 0');

  const copy = () => {
    navigator.clipboard.writeText(color.rgb.hex);
    setCopied(true);
  };

  useEffect(() => {
    if (idx === 0) {
      setBorderRadius('1rem 0 0 1rem');
    } else if (idx === len - 1) {
      setBorderRadius('0 1rem 1rem 0');
    }
  }, [idx, len]);

  return (
    <Bar
      radius={borderRadius}
      style={{
        backgroundColor: color.rgb.hex,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setCopied(false);
      }}
      onClick={copy}
    >
      <HexText style={{ color: color.rgb.contrast }}>
        {hovering ? (
          <>
            {copied ? (
              <FaCheck size={12} color={color.rgb.contrast} />
            ) : (
              <FaCopy size={12} color={color.rgb.contrast} />
            )}
            Copy
          </>
        ) : (
          color.rgb.hex
        )}
      </HexText>
    </Bar>
  );
};

export default ColorBar;
