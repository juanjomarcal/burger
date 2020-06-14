import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        type={control.type}
        change={props.ingredientChange}
        disabledInfo={props.disabledInfo}
      />
    ))}
  </div>
)

export default BuildControls;
