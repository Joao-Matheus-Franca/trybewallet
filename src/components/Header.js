import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email,
      // total,
      // currency,
    } = this.props;
    return (
      <>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">0</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // total: PropTypes.string.isRequired,
  // currency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
