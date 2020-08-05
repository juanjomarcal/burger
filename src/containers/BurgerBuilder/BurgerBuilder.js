import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
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
    return sum > 0;
  }

  changeIngredientHandler = (type, action) => {
    if (action === 'remove' && this.props.ingredients[type] <= 0){
      return;
    }
    if (action === 'add'){
        this.props.onIngredientAdded(type);
    }else{
        this.props.onIngredientRemoved(type);
    }
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render(){
    const disabledInfo = {
      ...this.props.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = <OrderSummary
      ingredients={this.props.ingredients}
      price={this.props.totalPrice}
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
        <Burger ingredients={this.props.ingredients}/>
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.props.totalPrice}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          ordered={this.purchaseHandler}
          />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredientName
    }),
    onIngredientRemoved: (ingredientName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredientName
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
