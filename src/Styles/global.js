import {createGlobalStyle} from 'styled-components'



const GlobalStyled = createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 97.5%;
    }

    html, body {
        height: 100%  
    }

    body {
        color: #f3f3f3;
        background: gray;
    }
    #root {
    max-width: 1080px;
    margin: 0 auto;
    padding: 40px 20px;
     }
    button {
    cursor: pointer;
    }
`

export default GlobalStyled