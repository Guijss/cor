import { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaCopy } from 'react-icons/fa';

const HexTextContainer = styled.span`
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
  @media only screen and (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const HexText = ({ color, visible }) => {
  const [copied, setCopied] = useState(false);
  const [hovering, setHovering] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(color.rgb.hex);
    setCopied(true);
  };

  return (
    <HexTextContainer
      style={{ color: color.rgb.contrast }}
      opacity={visible === 1 ? 1 : 0}
      onClick={copy}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setCopied(false);
      }}
    >
      {hovering ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ margin: '2px 5px 0 0' }}>
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
    </HexTextContainer>
  );
};

export default HexText;
