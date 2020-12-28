import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { UserContainer } from './components/UserContainer'
import { sortPayeeListLodash } from './api/util'
import { Button } from './components/Button'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`


function App() {
const [toogleList, setToggleList] = useState<boolean>(false);
const data = sortPayeeListLodash();
const listItems = data.map((d,index) =>
    <li key={index}>{d.name}</li>
);
  return (
    <>
        <Button onClick = {() => setToggleList(!toogleList)}>{toogleList ?'show Users': 'show Payee List'}</Button>
        <hr/>
        {!toogleList &&
            <>
                <GlobalStyle />
                <UserContainer />
            </>
        }
        {toogleList && <ul>{listItems}</ul>}
        </>

  );
}

export default App;
