import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import styleConfig from '../config/styleConfig';

injectGlobal([`
    @keyframes sk-rotate { 
        100% { transform: rotate(360deg); }
    }

    @keyframes sk-bounce {
        0%, 100% { 
          transform: scale(0.0);
        } 50% { 
          transform: scale(1.0);
        }
    }
`]);

const Spinner = styled.div`
    margin: 25px auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;
    animation: sk-rotate 2.0s infinite linear;
`;

const SpinnerDot = styled.div`
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: ${ styleConfig.colors.white };
    border-radius: 100%;
    animation: sk-bounce 2.0s infinite ease-in-out;

    ${ props => props.dotType === 'dot2' ? 
        `top: auto;
        bottom: 0;
        animation-delay: -1.0s;` : ``
    }

`;

const SearchSpinner = (props) => {

    if(props.isSearching) {
        return (
            <Spinner>
                <SpinnerDot dotType="dot1"></SpinnerDot>
                <SpinnerDot dotType="dot2"></SpinnerDot>
            </Spinner>
        );
    } else {
        return(<div></div>);
    }

}

export default SearchSpinner;