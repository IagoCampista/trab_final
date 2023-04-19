import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import api_axios from '../api'
import SignUp from '../pages/SignUp';
import { MemoryRouter } from 'react-router-dom';

const mockApi = { get: jest.fn(), post: jest.fn() };

describe('Already Logged test', () => {
    it('renderiza a de aviso que ja esta logado ', () => {
    // Define o mock da chave "authToken" no localStorage
      Object.defineProperty(window.localStorage, 'authToken', {
        value: 'anyToken',
        writable: true,
      });
    render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>)  
  
    const loggedMessage = screen.getByTestId('alreadyLoggedMessage');
    expect(loggedMessage).toBeInTheDocument();

  });
})

describe('SignUp tests', () => {
  beforeEach(() => {
    // Define o mock da chave "authToken" no localStorage
      Object.defineProperty(window.localStorage, 'authToken', {
        value: '',
        writable: true,
      });
  });
  
  it('renderiza a pagina de cadastro ', () => {
    render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>)  
    const title = screen.getByText('Cadastro de Vendedor');
    expect(title).toBeInTheDocument();

    const nomeInput = screen.getByTestId('nome');
    expect(nomeInput).toBeInTheDocument();

    const emailInput = screen.getByTestId('email');
    expect(emailInput).toBeInTheDocument();

    const senhaInput = screen.getByTestId('senha');
    expect(senhaInput).toBeInTheDocument();

    const botaoCadastrar = screen.getByTestId('botaoCadastrar');
    expect(botaoCadastrar).toBeInTheDocument();
  });

  it('nao mostra os alertas se os campos estão ok', () => {
       window.alert = jest.fn()
    render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>)
    const nomeInput = screen.getByTestId('nome');
    fireEvent.change(nomeInput, { target: { value: 'João Silva' } });

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'joao@teste.com' } });

    const senhaInput = screen.getByTestId('senha');
    fireEvent.change(senhaInput, { target: { value: 'senha123' } });

    const botaoCadastrar = screen.getByTestId('botaoCadastrar');
    fireEvent.click(botaoCadastrar);

    expect(window.alert).not.toHaveBeenCalledWith();
  });

  it('mostra o alerta caso algum campo esteja em branco', () => {
    window.alert = jest.fn()
    render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>);
    const submitButton = screen.getByTestId('botaoCadastrar');

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Campos em branco!');
  });

  it('mostra o alerta se o email é inválido', () => {
      window.alert = jest.fn()
      render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
      const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'emailinvalido' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.change(nomeInput, { target: { value: 'Joao Moura' } });
      fireEvent.click(botaoCadastrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');

      fireEvent.change(emailInput, { target: { value: 'emailinvalido@' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.change(nomeInput, { target: { value: 'Joao Moura' } });
      fireEvent.click(botaoCadastrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');

      fireEvent.change(emailInput, { target: { value: '@emailinvalido' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.change(nomeInput, { target: { value: 'Joao Moura' } });
      fireEvent.click(botaoCadastrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');
    });

    it('nao mostra o alerta se o email é válido', () => {
      window.alert = jest.fn()
      render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
      const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'emailvalido@email.com' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.change(nomeInput, { target: { value: 'Joao Moura' } });
      fireEvent.click(botaoCadastrar);

      expect(window.alert).not.toHaveBeenCalledWith();    
    });
    
    it('mostra o alerta se o nome é muito pequeno', () => {
    window.alert = jest.fn()
    render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>);
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
    const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
    const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

    fireEvent.change(nomeInput, { target: { value: 'Joe' } });
    fireEvent.change(emailInput, { target: { value: 'emailvalido@email.com' } });
    fireEvent.change(senhaInput, { target: { value: 'senha123' } });
    fireEvent.click(botaoCadastrar);

    expect(window.alert).toHaveBeenCalledWith('O nome inserido é muito pequeno!');

    fireEvent.change(nomeInput, { target: { value: 'Joao' } });
    fireEvent.change(emailInput, { target: { value: 'emailvalido@email.com' } });
    fireEvent.change(senhaInput, { target: { value: 'senha123' } });
    fireEvent.click(botaoCadastrar);

     expect(window.alert).toHaveBeenCalledWith('O nome inserido é muito pequeno!');

  });

    it('nao mostra o alerta se o nome está ok', () => {
    window.alert = jest.fn()
    render(<MemoryRouter><SignUp api={api_axios}/></MemoryRouter>);
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
    const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
    const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

    fireEvent.change(nomeInput, { target: { value: 'João Moura' } });
    fireEvent.change(emailInput, { target: { value: 'emailvalido@email.com' } });
    fireEvent.change(senhaInput, { target: { value: 'senha123' } });
    fireEvent.click(botaoCadastrar);

    expect(window.alert).not.toHaveBeenCalledWith('Cliente adicionado com sucesso');
  });
 
});