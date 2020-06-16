import React from 'react';
import BurgerLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {

  return(
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={[classes.SideDrawer, classes[props.open ? 'Open' : 'Close']].join(' ')}>
        <div className={classes.Logo}>
          <BurgerLogo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
