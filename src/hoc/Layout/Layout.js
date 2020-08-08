import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from '../Aux/Aux';

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
        <Toolbar
          sideDrawerToggleHandler={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closeHandler={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    )}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

export default connect(mapStateToProps)(layout);
