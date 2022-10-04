import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  render() {
    const { editing } = this.props;
    return (
      <>
        <Header />
        {editing ? <EditForm /> : <WalletForm />}
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editing: state.editing,
});

Wallet.propTypes = {
  editing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
