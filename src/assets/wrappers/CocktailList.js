import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  /* Setting up grid cols with repeat function and mixmax function */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export default Wrapper;
