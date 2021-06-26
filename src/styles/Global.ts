import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --red: #e52e4d;
        --green: #33cc95;
        --blue: #5429cc;
        --blue-light: #6933ff;
        --text-title: #363f5f;
        --text-body: #969cb3;
        --shape: #ffffff;
        --input-background: #e7e9ee;
        --input-border: #d7d7d7;
    }

    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }

    // configuração necessaria para trabalhar com medidas REM
    //1REM equivale ao font-size configurado na tag html
    // DEFAULT 16PX
    html {
        @media (max-width: 1088px) {
            font-size: 93.75%; //15px
        }

        @media (max-width: 728px) {
            font-size: 87.5%;
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1,h2,h3,h4,h5,h6 strong {
     font-weight:  600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);

        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .react-modal-content {
        width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.24rem;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 1px;
        background: transparent;

        height: 20px;
        width: 20px;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: filter 0.2s;

        &:hover{
            border: 1px solid var(--green);            
            filter: brightness(0.9);

        }
    }
`