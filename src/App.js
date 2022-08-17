import styled from 'styled-components';
import Picker from './components/Picker';

const PageContainer = styled.div`
  position: relative;
  background-color: #a4a4a4;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

function App() {
  return (
    <PageContainer>
      <Picker />
    </PageContainer>
  );
}

export default App;
