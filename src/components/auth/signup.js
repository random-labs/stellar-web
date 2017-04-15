import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  // Called with all different properties from our form so call it with formProps. If form is not valid, redux-form is smart enough not to call the function
  handleFormSubmit(formProps){
    // Properties that get in are valid (redux-form will not run handleFormSubmit if not valid)
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderAlert(){

    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">

          <strong>Oops!</strong> {this.props.errorMessage}

        </div>
      );
    }
  }

  render() {

    // handleSubmit helper is pulled in from redux-form.
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">

          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}

        </fieldset>
        <fieldset className="form-group">

          <label>Password:</label>
          <input className="form-control" {...password} type="password"/>
          { /*password is a reference to password helper from redux-form. IF the passport field has been touched (clickin, clickout) & has error: return div */ }
          {password.touched && password.error && <div className="error">{password.error}</div>}

        </fieldset>
        <fieldset className="form-group">

          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password"/>
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

//reduxForm validation: 1)create new function called "validate", 2) pass it to reduxForm helper, 3) Whenever user changes or validates form, the validate function will be called.
function validate(formProps){
  //Contains all errors that our fields might be containing.
  const errors = {};

  // Reminder: Take out repetition with foreach, map or reduce or such ..
  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  // console.log(formProps);
  if (formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  // if no errors, return an empty errors object.
  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);
