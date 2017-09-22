import axios from 'axios';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from "redux-form";
import { RaisedButton } from "material-ui";
import { TextField } from "redux-form-material-ui";
import { Helmet } from "react-helmet";
import * as actions from "../../actions";

const required = value => (value == null ? 'Field is required' : undefined);
const emailValid = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);
// const emailLouisville

// function validateEmail(email) {
// var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// if(re.test(email)){
//     //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
//     if(email.indexOf("@thedomain.com", email.length - "@thedomain.com".length) !== -1){
//         //VALID
//         console.log("VALID");
//     }
// }

const matchPasswords = (value, allValues, props) => {
  const match = allValues.original_password === allValues.confirm_password
  return (match ? null : 'Passwords must match');
};

class Signup extends Component {


  handleFormSubmit(formProps) {
    // this.props.signupUser(formProps);
    // console.log(formProps);
    console.log("Outside Axios");
    console.log(this.props);
    return axios.post(`/auth/signup`, { email: formProps.email, password: formProps.original_password })
      .then(response => {
        // dispatch({ type: AUTH_USER });
        // localStorage.setItem('token', response.data.token);
        // this.props.history.push('/');
        console.log("Inside Axios");
        console.log(this.props);
        console.log(this.props.history);
        this.props.signupUser(response.data.token, this.props.history);
      })
      .catch(error => {
        throw new SubmissionError(error.response.data)
      });
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
    const { handleSubmit, error } = this.props;

    document.body.style.backgroundColor = "#f3f3f4";

    return (
      <div>
        <Helmet>
          <title>FOV - Sign Up</title>
        </Helmet>
        <div className="middle-box text-center loginscreen animated fadeInDown">
          <div>
            <div>
              <h2>¯\_(ツ)_/¯</h2>
              <h3>Enter at your own risk.</h3>
              <p>Alpha Version</p>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                  floatingLabelText="Email"
                  floatingLabelFixed={true}
                  name="email"
                  type="text"
                  component={TextField}
                  hintText="me@louisvilleco.gov"
                  validate={[required,emailValid]}
                />
                <Field
                  floatingLabelText="Password"
                  floatingLabelFixed={true}
                  name="original_password"
                  type="password"
                  component={TextField}
                  hintText="password"
                  validate={ [ required, matchPasswords ] }
                />
                <Field
                  floatingLabelText="Confirm Password"
                  floatingLabelFixed={true}
                  name="confirm_password"
                  type="password"
                  component={TextField}
                  hintText="confirm password"
                  validate={ [ required, matchPasswords ] }
                />
                {this.renderAlert()}
                {error && <strong>{error}</strong>}
                <RaisedButton
                  type="submit"
                  label="Sign In"
                  fullWidth={true}
                  style={{ backgroundColor: "#27985b" }}
                />
              </form>
              <p className="m-t">
                <small>City of Louisville, CO &copy; 2016</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter an email";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signup = connect(mapStateToProps, actions)(Signup)
Signup = reduxForm({
  // validate,
  form: "signin",
})(Signup)
// Signup = withRouter(Signin)
export default Signup;
