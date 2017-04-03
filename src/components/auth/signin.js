import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

  handleFormSubmit({ email, password }){
    //console.log(email, password);
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
          <div className="alert alert-danger">
            <strong>Oops!</strong> {this.props.errorMessage}
          </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return(
        /* run handleSubmit from redux-form and pass a callback. callback needs to be binded to this. */
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
              <label>Email:</label>
              <input {...email} className="formControl" />
          </fieldset>

          <fieldset className="form-group">
              <label>Password:</label>
              <input {...password} type="password" className="formControl" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
    );
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  //Naming according to server setup
  fields: ['email', 'password']
//pass in the actions variable to get access to all of our different actions on props inside the component.
}, mapStateToProps, actions)(Signin);
