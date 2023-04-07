import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import NavBar from '../navBar';

describe('NavBar Tests', () => {
  it('renderiza todos os links', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const linkCatalogo = screen.getByTestId('linkCatalogo');
    const linkClientes = screen.getByTestId('linkClientes');
    const linkRegistroCliente = screen.getByTestId('linkRegistroCliente');
    const linkRegistroArea = screen.getByTestId('linkRegistroArea');
    const linkCadastro = screen.getByTestId('linkCadastro');
    const linkLogin = screen.getByTestId('linkLogin');

    expect(linkCatalogo).toBeInTheDocument();
    expect(linkClientes).toBeInTheDocument();
    expect(linkRegistroCliente).toBeInTheDocument();
    expect(linkRegistroArea).toBeInTheDocument();
    expect(linkCadastro).toBeInTheDocument();
    expect(linkLogin).toBeInTheDocument();
  });

  it('verifica se os links redirecionam para a rota correta', () => {	
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const linkCatalogo = screen.getByTestId('linkCatalogo');
    expect(linkCatalogo).toHaveAttribute('href', '/catalogo');
    
    const linkClientes = screen.getByTestId('linkClientes');
    expect(linkClientes).toHaveAttribute('href', '/clientList');

    const linkRegistroCliente = screen.getByTestId('linkRegistroCliente');
    expect(linkRegistroCliente).toHaveAttribute('href', '/clientRegistration');

    const linkRegistroArea = screen.getByTestId('linkRegistroArea');
    expect(linkRegistroArea).toHaveAttribute('href', '/areaRegistration');

    const linkCadastro = screen.getByTestId('linkCadastro');
    expect(linkCadastro).toHaveAttribute('href', '/signUp');

    const linkLogin = screen.getByTestId('linkLogin');
    expect(linkLogin).toHaveAttribute('href', '/');
  });
});