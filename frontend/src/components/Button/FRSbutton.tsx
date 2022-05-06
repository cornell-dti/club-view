import { useState } from 'react';
import './FRSbutton.css';

interface Props {
  /* registerPage: boolean; */
  buttonType: String;
  text: String;
}
/* TODO: add button navigation */
const FRSbutton = (props: Props) => {
  /* const className = props.registerPage? 'registerPage' : 'homePage'; */
  const className = '' + props.buttonType;
  const buttonText = props.text;

  return <button className={className}>{buttonText}</button>;
};

export default FRSbutton;
