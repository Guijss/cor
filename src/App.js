import { useState, useRef } from 'react';
import styled from 'styled-components';
import Picker from './components/Picker';
import colorSetup from './helpers/color';
import { CSSTransition } from 'react-transition-group';

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Banner = styled.div`
  position: relative;
  height: 10%;
  width: 100%;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.75);
  z-index: 99;
`;

const Page = styled.div`
  position: relative;
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const CurrentColor = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 2rem;
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const HexText = styled.span`
  position: relative;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const CopiedMsg = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  font-size: 0.6rem;
  border-radius: 0.3rem;
`;

function App() {
  const copiedRef = useRef(null);
  const [color, setColor] = useState(colorSetup(0, 100, 100));
  const [displayCopied, setDisplayCopied] = useState(false);
  const [theme, setTheme] = useState({
    nav: '#232323',
    main: '#353535',
    secondary: '#686868',
  });

  const copy = () => {
    navigator.clipboard.writeText(color.rgb.hex);
    setDisplayCopied(true);
    setTimeout(() => {
      setDisplayCopied(false);
    }, 500);
  };

  return (
    <PageContainer>
      <Banner style={{ backgroundColor: theme.nav }} />
      <Page style={{ backgroundColor: theme.main }}>
        <Picker theme={theme} color={color} setColor={setColor} />
        <CurrentColor
          style={{
            backgroundColor: `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
          }}
        >
          <CSSTransition
            nodeRef={copiedRef}
            in={displayCopied}
            timeout={200}
            classNames="copied"
            unmountOnExit
          >
            <CopiedMsg ref={copiedRef} style={{ color: color.rgb.contrast }}>
              Copied!
            </CopiedMsg>
          </CSSTransition>
          <HexText style={{ color: color.rgb.contrast }} onClick={copy}>
            {color.rgb.hex}
          </HexText>
        </CurrentColor>
      </Page>
    </PageContainer>
  );
}

export default App;
