import React, {Component} from 'react';
// import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
                  .map(igKey => {
                    return ingredients[igKey]
                  })
                  .reduce((sum, el) => {
                    return sum + el;
                  }, 0);
    this.setState({
      purchasable: sum > 0
    });
  }

  changeIngredientHandler = (type, action) => {
    const oldCount = this.state.ingredients[type];
    if (action === 'remove' && oldCount <= 0){
      return;
    }
    let updatedCount = oldCount;
    if(action === 'add'){
      updatedCount = oldCount + 1;
    }else{
      updatedCount = oldCount - 1;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice;
    if(action === 'add'){
      newPrice = oldPrice + priceAddition;
    }else{
      newPrice = oldPrice - priceAddition;
    }
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?'+queryString
    });
  }

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}/>

    if(this.state.loading) {
      orderSummary = <Spinner/>;
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler} loading={this.state.loading}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;
