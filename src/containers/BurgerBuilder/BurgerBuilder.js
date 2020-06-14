import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
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
  }

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientChange={this.changeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;
