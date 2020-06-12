import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={() => props.change(props.type, 'remove')} disabled={props.disabledInfo[props.type]}>Less</button>
    <button className={classes.More} onClick={() => props.change(props.type, 'add')}>More</button>
  </div>
)

export default BuildControl;
