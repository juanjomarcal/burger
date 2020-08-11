import React, { Suspense, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout';
import Spinner from './components/UI/Spinner/Spinner';

/*const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});*/

const lazyCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const lazyOrders = React.lazy(() => import('./containers/Orders/Orders'));
const lazyAuth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/auth" component={lazyAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    if(this.props.isAuth) {
      routes = (
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/checkout" component={lazyCheckout} />
            <Route path="/orders" component={lazyOrders} />
            <Route path="/auth" component={lazyAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
