import styled from 'styled-components'



export const Div = styled.div`
  margin: 0 auto;
  padding: 0;
  background: ${props => `no-repeat url("${props.url}") center/cover`};
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`