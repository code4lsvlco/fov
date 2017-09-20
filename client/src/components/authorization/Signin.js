import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm , Field } from 'redux-form';
import * as actions from '../../actions';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control" />
        </div>
    );
}

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
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

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
            <label>Email:</label>
            <Field name="email" type="email" component={renderInput} />
        </div>
        <div className="form-group">
            <label>Password:</label>
            <Field name="password" type="password" component={renderInput} />
        </div>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// export default reduxForm({
//   form: 'signin',
//   fields: ['email', 'password']
// }, mapStateToProps, actions)(Signin);

// Signin = connect(mapStateToProps,actions)(Signin)
// Signin = reduxForm({
//   form: 'signin',
//   fields: ['email', 'password']
// })(Signin)
// export default Signin

export default reduxForm({
  // validate,
  form: "signin",
})(connect(mapStateToProps, actions)(Signin));
