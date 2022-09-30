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
  },
  isFetching: false,
  error: '',
};

function rootReducer(state = INITIAL_STATE, action) {
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
      },
      isFetching: false };
  case 'ERROR_API':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default rootReducer;
