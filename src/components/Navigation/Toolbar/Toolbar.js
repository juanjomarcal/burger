import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import BurgerLogo from '../../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <BurgerLogo/>
    <nav>
      <NavigationItems/>
    </nav>
  </header>
);

export default toolbar;
