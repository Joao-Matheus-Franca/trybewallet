import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { description, tag, method,
      value, coin, exchange, newValue, coinValue } = this.props;
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
        <tr>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{coin}</td>
          <td>{exchange}</td>
          <td>{newValue}</td>
          <td>{coinValue}</td>
        </tr>
      </table>
    );
  }
}

Table.propTypes = {
  description: PropTypes.string,
  tag: PropTypes.string,
  method: PropTypes.string,
  value: PropTypes.string,
  coin: PropTypes.string,
  exchange: PropTypes.string,
  newValue: PropTypes.string,
  coinValue: PropTypes.string,
}.isRequired;

export default Table;
