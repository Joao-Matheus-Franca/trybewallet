export function deleteReducer(state, action) {
  return {
    ...state,
    wallet: {
      ...state.wallet,
      expenses: state.wallet.expenses.filter((e) => e.id !== action.id),
      total: state.wallet.expenses.filter((e) => e.id !== action.id)
        .map((e) => Number(e.value) * Number(e.exchangeRates[e.currency].ask)),
    },
  };
}

export function editReducer(state, action) {
  return {
    ...state,
    wallet: {
      ...state.wallet,
      expenses: state.wallet.expenses.map((e) => {
        if (e.id === action.id) {
          return {
            ...e,
          };
        }
        return { ...e };
      }),
    },
    editing: true,
    idToEdit: action.id,
  };
}

const assistant = (state, action) => state.wallet.expenses.map((e) => {
  if (e.id === action.id) {
    return {
      id: e.id,
      exchangeRates: e.exchangeRates,
      ...action.value,
    };
  }
  return { ...e };
});

export function finalEditReducer(state, action) {
  return {
    ...state,
    wallet: {
      ...state.wallet,
      expenses: assistant(state, action),
      total: assistant(state, action)
        .map((e) => Number(e.value) * Number(e.exchangeRates[e.currency].ask)),
    },
    editing: false,
  };
}
