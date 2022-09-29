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
};

function rootReducer(state = INITIAL_STATE) {
  return state;
}

export default rootReducer;
