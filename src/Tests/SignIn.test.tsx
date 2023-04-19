import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignIn from '../pages/SignIn';
import api_axios from '../api'
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

describe('Login Render Test', () => {
    it('renderiza a pagina de login', ()=> {
        render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>)
        expect(screen.getByTestId('email')).toBeInTheDocument()
        expect(screen.getByTestId('senha')).toBeInTheDocument()
        expect(screen.getByTestId('botaoEntrar')).toBeInTheDocument()
       })
})

describe('Login Test', () => {

  const mockVendedores = [
       {
              "id": 0,
              "nome": "Nicolas Pereira",
              "senha": "12345",
              "email": "nicolasp@gmail.com"
       },
       {
              "id": 1,
              "nome": "Jorge Alves",
              "senha": "12345",
              "email": "jorgea@gmail.com"
       },
       {
              "id": 2,
              "nome": "Lucas da Silva",
              "senha": "1212133133",
              "email": "lucas@gg.com"
       },];

    const mockApi = axios.create({
      baseURL: 'http://localhost:3000/',
    });

    it('mostra o alerta se o os campos estão em branco', () => {
      window.alert = jest.fn()
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: '' } })
      fireEvent.change(senhaInput, { target: { value: '' } })
      // no select é só nao fazer nada com ele que ele fica em branco

      fireEvent.click(botaoEntrar)

      expect(window.alert).toHaveBeenCalledWith('Campos em branco!');
    });

    it('mostra o alerta se o email é inválido', () => {
      window.alert = jest.fn()
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'emailinvalido' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');

      fireEvent.change(emailInput, { target: { value: 'emailinvalido@' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');

      fireEvent.change(emailInput, { target: { value: '@emailinvalido' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      expect(window.alert).toHaveBeenCalledWith('Email inválido!');
    });

    it('nao mostra o alerta se o email é válido', () => {
      window.alert = jest.fn()
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'emailvalido@email.com' } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);

      expect(window.alert).not.toHaveBeenCalledWith();    
    });

    it('mostra o alerta se a senha é inválida', async () => {
      jest.spyOn(mockApi, 'post').mockResolvedValue({ data: mockVendedores });
      window.alert = jest.fn()

      // Define o mock da chave "authToken" no localStorage
      Object.defineProperty(window.localStorage, 'authToken', {
        value: '',
        writable: true,
      });
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'iago@gmail.com'  } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      await waitFor(() => {
       expect(screen.getByTestId('errorMessage')).toHaveTextContent('Error: Senha incorreta');
       });
    });

    it('mostra o alerta se a senha é inválida', async () => {
      jest.spyOn(mockApi, 'post').mockResolvedValue({ data: mockVendedores });
      window.alert = jest.fn()

      // Define o mock da chave "authToken" no localStorage
      Object.defineProperty(window.localStorage, 'authToken', {
        value: '',
        writable: true,
      });
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'iago@gmail.com'  } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      await waitFor(() => {
       expect(screen.getByTestId('errorMessage')).toHaveTextContent('Error: Senha incorreta');
       });
    });

    it('mostra o alerta se o email nao esta cadastrado', async () => {
      jest.spyOn(mockApi, 'post').mockResolvedValue({ data: mockVendedores });
      window.alert = jest.fn()

      // Define o mock da chave "authToken" no localStorage
      Object.defineProperty(window.localStorage, 'authToken', {
        value: '',
        writable: true,
      });
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'iagox@gmail.com'  } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      await waitFor(() => {
       expect(screen.getByTestId('errorMessage')).toHaveTextContent('Error: Vendedor não encontrado');
       });
    });

    it('checa o Token de Autenticacao se o login  foi bem sucedido', async () => {
      jest.spyOn(mockApi, 'post').mockResolvedValue({ data: mockVendedores });

      // Define o mock da chave "authToken" no localStorage
      Object.defineProperty(window.localStorage, 'authToken', {
        value: '',
        writable: true,
      });
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const senhaInput = screen.getByTestId('senha') as HTMLInputElement;
      const botaoEntrar = screen.getByTestId('botaoEntrar') as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'iagox@gmail.com'  } });
      fireEvent.change(senhaInput, { target: { value: 'senha123' } });
      fireEvent.click(botaoEntrar);
      
      //confere se o o authToken no local storage foi alterado
      expect(window.localStorage.getItem('authToken')).toBeDefined();
      expect(window.localStorage.getItem('authToken')).not.toBeNull();
    });

    it('checa se o usuario ja esta logado', async () => {
      jest.spyOn(mockApi, 'post').mockResolvedValue({ data: mockVendedores });

      // Define o mock da chave "authToken" no localStorage
      Object.defineProperty(window.localStorage, 'authToken', {
        value: 'anyToken',
        writable: true,
      });
      render(<MemoryRouter><SignIn api={api_axios}/></MemoryRouter>);

      //confere se a mensagem de logado com sucesso aparece na pagina
      expect(screen.getByTestId('loggedSucessfullyMessage')).toBeInTheDocument()
    });

})