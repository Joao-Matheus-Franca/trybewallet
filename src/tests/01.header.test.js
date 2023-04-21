import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockStore from './helpers/mockRedux';

test('Testando a exibição do e-mail no Header', () => {
  renderWithRouterAndRedux(<App />, { initialState: mockStore });
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const button = screen.getByRole('button', {
    name: /entrar/i,
  });
  userEvent.type(emailInput, 'teste@teste.com');
  userEvent.type(passwordInput, '123456789');
  userEvent.click(button);
  const emailField = screen.getByTestId('email-field');
  expect(emailField.innerHTML).toBe('teste@teste.com');
});
