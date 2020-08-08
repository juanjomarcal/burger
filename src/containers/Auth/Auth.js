import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password'
        },
        value: '',
        validation: {
          required: true,
          minLenght: 6
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
      isValid = (value.trim() !== '' && isValid);
    }
    if(rules.minLenght){
      isValid = (value.length >= rules.minLenght && isValid);
    }
    if(rules.maxLenght){
      isValid = (value.length <= rules.maxLenght && isValid);
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.controls }
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
  }

  authHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {
    const formElements = [];
    for(let key in this.state.controls){
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = (
      <form>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.authHandler} disabled={!this.state.formIsValid}>Submit</Button>
      </form>
    );

    return (
      <div className={classes.Auth}>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth);
