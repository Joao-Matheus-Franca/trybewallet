import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import saveEmail from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btn: true,
    redirect: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.verifyInputs);
  };

  verifyInputs = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const validEmail = email.split('').filter((e) => e === '@').length;
    const validEmailPosition = email.split('').indexOf('@');
    if (email.includes('@')
    && email.includes('.com')
    && validEmail === 1
    && validEmailPosition !== (email.length - 1)
    && password.length >= minLength) {
      this.setState({ btn: false });
    } else {
      this.setState({ btn: true });
    }
  };

  render() {
    const { email, btn, redirect } = this.state;
    const { value } = this.props;
    return (
      <>
        <h1>Login</h1>
        <label htmlFor="email">
          E-mail:
          <br />
          <input
            name="email"
            data-testid="email-input"
            type="email"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          Senha:
          <br />
          <input
            name="password"
            data-testid="password-input"
            type="password"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <button
          type="button"
          disabled={ btn }
          onClick={ () => {
            this.setState({ redirect: true });
            return value(email);
          } }
        >
          Entrar
        </button>
        { redirect && <Redirect to="/carteira" />}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  value: (state) => dispatch(saveEmail(state)),
});

Login.propTypes = {
  value: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
