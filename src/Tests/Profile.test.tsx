import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../pages/Profile';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');


describe('Profile Render Tests', () => {
  const mockApi = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  it('Renderiza a pagina de ja logado', () => {
    // Define o mock da chave "authToken" no localStorage
    Object.defineProperty(window.localStorage, 'authToken', {
      value: 'mock-token',
      writable: true,
    });

    render(<BrowserRouter>
        <Profile api={mockApi} />
      </BrowserRouter>);
    const vendedorNome = screen.getByTestId('vendedorNome');
    const vendedorEmail = screen.getByTestId('vendedorEmail');

    expect(vendedorNome).toBeInTheDocument();
    expect(vendedorEmail).toBeInTheDocument();
  });

  it('Renderiza a pagina de aviso que nao esta logado', () => {
    // Define o mock da chave "authToken" no localStorage como vazia (não logado)
    Object.defineProperty(window.localStorage, 'authToken', {
      value: '',
      writable: true,
    });

    render(<BrowserRouter>
        <Profile api={mockApi} />
      </BrowserRouter>);
    const botaoLogin = screen.getByTestId('botaoLogin');
    const notLoggedMessage = screen.getByTestId('notLoggedMessage');

    expect(botaoLogin).toBeInTheDocument();
    expect(notLoggedMessage).toBeInTheDocument();
  });
});

describe('Profile Tests', () => {
  const mockApi = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  it('confere se o local Storage foi limpo ao fazer sign out', () => {
    // Define o mock da chave "authToken" no localStorage 
    Object.defineProperty(window.localStorage, 'authToken', {
      value: 'mock-token',
      writable: true,
    });

    render(<BrowserRouter>
        <Profile api={mockApi} />
      </BrowserRouter>);
    const botaoSair = screen.getByTestId('botaoSair') as HTMLButtonElement;
    fireEvent.click(botaoSair);
    expect(window.localStorage.getItem('authToken')).toBeNull();

    expect(botaoSair).toBeInTheDocument();
  });
});
