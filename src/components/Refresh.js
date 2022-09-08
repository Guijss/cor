import styled from 'styled-components';
import { BiRefresh } from 'react-icons/bi';

const RefreshContainer = styled.div`
  position: relative;
  width: 50%;
  height: 10%;
  background-color: beige;
  border-radius: 1rem;
  display: ${(props) => (props.mainPicked ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const Refresh = ({ mainPicked, keyUpHandler }) => {
  return (
    <RefreshContainer
      mainPicked={mainPicked}
      onClick={(e) => keyUpHandler(e, true)}
    >
      <BiRefresh size={40} color="black" />
    </RefreshContainer>
  );
};

export default Refresh;
