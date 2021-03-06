import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />
    if(!this.props.loading){
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      )
    }
    if(this.props.error){
      orders = <p>{this.props.error}</p>
    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
