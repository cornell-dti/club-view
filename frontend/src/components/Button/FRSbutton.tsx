import { useState } from 'react';

interface Props {
    registerPage: boolean; 
    text: String; 
}
/* TODO: add button navigation */
const FRSbutton = (props: Props) => { 
    const className = props.registerPage? 'registerPage' : 'homePage';
    const buttonText = props.text; 

    return (
        <button className={className}>
            {buttonText}
        </button>
    );
}

    
export default FRSbutton;