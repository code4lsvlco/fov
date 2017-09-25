import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm , Field } from 'redux-form';
import * as actions from '../../state/ducks/authentication/actions';

const renderInput = field => {
  const { input, type, label, placeholder } = field;
  return (
    <div className="form-group">
      <label>{label}</label>
      <input {...input} type={type} className="form-control" placeholder={placeholder}/>
    </div>
  );
}

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(this.props);
    this.props.signinUser({ email, password, history: this.props.history });
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
    const { handleSubmit } = this.props;

    document.body.style.backgroundColor = '#f3f3f4';

    return (
      <div>
        <Helmet>
          <title>FOV - Sign In</title>
        </Helmet>
        <div className="middle-box text-center loginscreen animated fadeInDown">
          <div>
            <div>
              <h2>¯\_(ツ)_/¯</h2>
              <h3>Enter at your own risk.</h3>
              <p>Alpha Version</p>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field label="Email" name="email" type="email" component={renderInput} placeholder="me@louisvilleco.gov"/>
                <Field label="Passwords" name="password" type="password" component={renderInput} placeholder="password"/>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary block full-width m-b" style={{ backgroundColor: "#00853e", borderColor: "none" }}>Sign in</button>
              </form>
              <Link to="/forgotpassword">
                <small>Forgot password?</small>
              </Link>
              <p className="text-muted text-center">
                <small>Do not have an account?</small>
              </p>
              <Link to="/signup" className='btn btn-sm btn-white btn-block'>
                Create an account
              </Link>
              <p className='m-t'>
                <small>City of Louisville, CO &copy; 2016</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.authentication.error };
}

Signin = connect(mapStateToProps, actions)(Signin)
Signin = reduxForm({
  form: "signin",
})(Signin)
export { Signin };
