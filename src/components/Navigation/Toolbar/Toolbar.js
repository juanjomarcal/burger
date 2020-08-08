import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import BurgerLogo from '../../Logo/Logo';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.sideDrawerToggleHandler}/>
    <div className={classes.Logo}>
      <BurgerLogo/>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;
