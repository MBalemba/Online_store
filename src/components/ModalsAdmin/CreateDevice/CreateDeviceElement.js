import styled from 'styled-components'


export const DivImg = styled.div`
  margin: 0 auto;
  padding: 0;
  background: ${props => props.url ? `no-repeat url("${props.url}") top/contain`: ''};
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  height: 400px;
`

export const Img = styled.img`
  margin: 0 auto;
  display: ${({disp} ) => disp ? 'block': 'none' };
  max-width: 100%;
  width: auto;
  height: 400px;
`
