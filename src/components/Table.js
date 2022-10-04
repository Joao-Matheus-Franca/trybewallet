import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses, editExpenses } from '../redux/actions';
// import EditForm from './EditForm';

class Table extends Component {
  render() {
    const { expenses, del, edit } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses.length > 0 && expenses.map((e) => (
          <tbody key={ e.id }>
            <tr>
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{Number(e.value).toFixed(2)}</td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
              <td>
                {(Number(e.exchangeRates[e.currency].ask) * Number(e.value))
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => edit(e.id) }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => del(e.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
            {/* { editing && (<EditForm id={ e.id } />) } */}
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editing: state.editing,
});

const mapDispatchToProps = (dispatch) => ({
  del: (id) => dispatch(deleteExpenses(id)),
  edit: (id) => dispatch(editExpenses(id)),
});

Table.propTypes = {
  expenses: PropTypes.objectOf,
  del: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
