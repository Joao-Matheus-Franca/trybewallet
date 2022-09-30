import React, { Component } from 'react';
import PropTrypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { fetch } = this.props;
    return fetch();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value">
          <input
            data-testid="value-input"
            type="number"
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
          />
        </label>
        <select
          data-testid="currency-input"
        >
          { currencies.map((e, i) => (<option key={ i }>{ e }</option>))}
        </select>
        <select
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchAPI()),
});

WalletForm.propTypes = {
  fetch: PropTrypes.func.isRequired,
  currencies: PropTrypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
