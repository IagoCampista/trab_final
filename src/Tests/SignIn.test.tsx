import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignIn from '../pages/SignIn';

describe('Login Render Test', () => {
    it('renderiza a pagina de login', ()=> {
        render(<SignIn/>)
        expect(screen.getByTestId('email')).toBeInTheDocument()
        expect(screen.getByTestId('senha')).toBeInTheDocument()
        expect(screen.getByTestId('botaoEntrar')).toBeInTheDocument()
       })
})

describe('Login Test', () => {
    it('mostra o alerta se o os campos estão em branco', () => {
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

    it('mostra o alerta se o email é inválido', () => {
      window.alert = jest.fn()
      render(<SignIn/>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const snehaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'emailinvalido' } });
      fireEvent.change(snehaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');

      fireEvent.change(emailInput, { target: { value: 'emailinvalido@' } });
      fireEvent.change(snehaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');

      fireEvent.change(emailInput, { target: { value: '@emailinvalido' } });
      fireEvent.change(snehaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');
    });

    it('nao mostra o alerta se o email é válido', () => {
      window.alert = jest.fn()
      render(<SignIn/>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const snehaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'emailvalido@email.com' } });
      fireEvent.change(snehaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);

      expect(window.alert).not.toHaveBeenCalledWith();    
    });
})