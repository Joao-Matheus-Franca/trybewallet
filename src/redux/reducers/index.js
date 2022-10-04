import userReducer from './user';
import { editReducer, deleteReducer, finalEditReducer } from './wallet';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
    total: [],
  },
  isFetching: false,
  error: '',
  editing: false,
};

function rootReducer(state = INITIAL_STATE, action) {
  const { value } = action;
  switch (action.type) {
  case 'SAVE_EMAIL':
    return userReducer(state, action);
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'GET_API':
    return { ...state,
      wallet: {
        ...state.wallet,
        currencies: action.payload,
      },
      isFetching: false };
  case 'ERROR_API':
    return { ...state, error: action.payload, isFetching: false };
  case 'ADD_EXPENSE':
    return {
      user: { ...state.user },
      wallet: { ...state.wallet,
        expenses: [...state.wallet.expenses, {
          id: state.wallet.expenses[0] === undefined ? 0
            : (state.wallet.expenses[state.wallet.expenses.length - 1].id + 1),
          ...action.value,
          exchangeRates: action.exchangeRates,
        }],
        total: [...state.wallet.total,
          (Number(action.exchangeRates[value.currency].ask) * Number(value.value))],
      },
      isFetching: false,
      error: '',
      editing: false,
    };
  case 'DELETE_EXPENSE':
    return deleteReducer(state, action);
  case 'EDIT_EXPENSE':
    return editReducer(state, action);
  case 'FINAL_EXPENSE':
    return finalEditReducer(state, action);
  default:
    return state;
  }
}

export default rootReducer;
