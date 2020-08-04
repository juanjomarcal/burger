import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for(let key in res.data){
          fetchedOrders.push({
            id: key,
            ...res.data[key]
          })
        }
        this.setState({orders: fetchedOrders, loading: false});
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default Orders;