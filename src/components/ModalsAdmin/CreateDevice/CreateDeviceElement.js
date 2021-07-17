import styled from 'styled-components'



export const Div = styled.div`
  margin: 0 auto;
  padding: 0;
  background: ${props => `no-repeat url("${props.url}") top/contain`};
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  height: 400px;
`