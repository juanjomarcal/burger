import React from 'react';
import BurgerLogo from '../../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <BurgerLogo/>
    <nav>
      ...
    </nav>
  </header>
);

export default toolbar;
