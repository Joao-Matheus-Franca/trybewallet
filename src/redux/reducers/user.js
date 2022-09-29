function userReducer(state, action) {
  return {
    ...state,
    user: {
      email: action.email,
    },
  };
}

export default userReducer;
