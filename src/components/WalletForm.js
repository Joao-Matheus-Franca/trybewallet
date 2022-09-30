import React, { Component } from 'react';
import PropTrypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, addExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { fetch } = this.props;
    return fetch();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { value, description, currency, method, tag } = this.state;
    const expense = { value, description, currency, method, tag };
    return expense;
  };

  render() {
    const { value, description } = this.state;
    const { currencies, expense } = this.props;
    return (
      <div>
        <label htmlFor="value">
          <input
            data-testid="value-input"
            type="number"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          { currencies.map((e, i) => (<option key={ i }>{ e }</option>))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ () => {
            expense(this.handleClick());
            this.setState({ value: '', description: '' });
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchAPI()),
  expense: (state) => dispatch(addExpenses(state)),
});

WalletForm.propTypes = {
  fetch: PropTrypes.func.isRequired,
  currencies: PropTrypes.arrayOf.isRequired,
  expense: PropTrypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
