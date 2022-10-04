import userReducer from './user';

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
        currencies: action.payload,
        expenses: [],
        editor: false,
        idToEdit: 0,
        total: [0],
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
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      wallet: {
        ...state.wallet,
        expenses: state.wallet.expenses.filter((e) => e.id !== action.id),
        total: state.wallet.expenses.filter((e) => e.id !== action.id)
          .map((e) => Number(e.value) * Number(e.exchangeRates[e.currency].ask)),
      },
    };
  default:
    return state;
  }
}

export default rootReducer;
