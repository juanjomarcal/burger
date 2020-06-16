import React from 'react';
import burgerImage from '../../assets/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerImage} alt="BurgerLogo"/>
  </div>
);

export default logo;
