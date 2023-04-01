import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignIn from './SignIn';

describe('Render Test', () => {
    it('renders register page without crashing', ()=> {
        render(<SignIn/>)
        expect(screen.getByTestId('email')).toBeInTheDocument()
        expect(screen.getByTestId('senha')).toBeInTheDocument()
        expect(screen.getByTestId('botaoEntrar')).toBeInTheDocument()
       })
})

describe('Login Test', () => {
    it('testa se o os campos estão em branco', () => {
      window.alert = jest.fn()
      render(<SignIn/>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const snehaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: '' } })
      fireEvent.change(snehaInput, { target: { value: '' } })
      // no select é só nao fazer nada com ele que ele fica em branco

      fireEvent.click(botaoEntrar)

      expect(window.alert).toHaveBeenCalledWith('Campos em branco!');
    });
})