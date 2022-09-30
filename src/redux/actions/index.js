const SAVE_EMAIL = 'SAVE_EMAIL';
const REQUEST_API = 'REQUEST_API';
const GET_API = 'GET_API';
const ERROR_API = 'ERROR_API';
const ADD_EXPENSE = 'ADD_EXPENSE';

const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

export const saveEmail = (state) => ({
  type: SAVE_EMAIL,
  email: state,
});

function requestAPI() {
  return { type: REQUEST_API };
}

function getAPI(json) {
  return { type: GET_API, payload: Object.keys(json).filter((e) => e !== 'USDT') };
}

function errorAPI(error) {
  return { type: ERROR_API, payload: error };
}

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch(ENDPOINT)
      .then((response) => response.json())
      .then((json) => dispatch(getAPI(json)))
      .catch((error) => errorAPI(error));
  };
}

export function expenses(prop, json) {
  return ({
    type: ADD_EXPENSE,
    value: prop,
    exchangeRates: json,
  });
}

export function addExpenses(prop) {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch(ENDPOINT)
      .then((response) => response.json())
      .then((json) => dispatch(expenses(prop, json)))
      .catch((error) => errorAPI(error));
  };
}
