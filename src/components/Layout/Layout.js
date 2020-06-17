import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';

class layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }

  render() {
    return(
      <Aux>
        <Toolbar sideDrawerToggleHandler={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closeHandler={this.sideDrawerToggleHandler}/>
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    )}
}

export default layout;
