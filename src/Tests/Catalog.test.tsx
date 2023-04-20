import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import Catalogo from '../pages/Catalog';
import { BrowserRouter } from 'react-router-dom';

const mockApi = { get: jest.fn(), post: jest.fn() };

describe('Catalog Tests', () => {
  const mockProdutos = [
    {
      id: 1,
      name: 'Produto 1',
      id_categoria: 1,
      preco: 10,
      idProdutoSubstituto: 2,
    },
    {
      id: 2,
      name: 'Produto 2',
      id_categoria: 2,
      preco: 20,
      idProdutoSubstituto: 3,
    },
  ];

  const mockApi = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  it('renderiza as tabelas com os produtos', async () => {
    jest.spyOn(mockApi, 'get').mockResolvedValue({ data: mockProdutos });

    // Define o mock da chave "authToken" no localStorage
    Object.defineProperty(window.localStorage, 'authToken', {
      value: 'mock-token',
      writable: true,
    });
    render(
      <BrowserRouter>
        <Catalogo api={mockApi} />
      </BrowserRouter>);

    // espera a tabela ser renderizada
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
      expect(screen.getByText('Produto 2')).toBeInTheDocument();
    });
  });

  it('renderiza o aviso se nao estiver logado', async () => {
    jest.spyOn(mockApi, 'get').mockResolvedValue({ data: mockProdutos });
    
    // Define o mock da chave "authToken" no localStorage como vazio para simular o usuario nao estar logado
    Object.defineProperty(window.localStorage, 'authToken', {
      value: '',
      writable: true,
    });
    render(
      <BrowserRouter>
        <Catalogo api={mockApi} />
      </BrowserRouter>);

    expect(screen.getByTestId('notLoggedMessage')).toBeInTheDocument();
   
  });

  it('mostra o aviso caso a lista de produtos esteja vazia', async () => {
      jest.spyOn(mockApi, 'get').mockResolvedValue({ data: [] });
      Object.defineProperty(window.localStorage, 'authToken', {
          value: 'mock-token',
          writable: true,
        });
      render(  
        <BrowserRouter>
          <Catalogo api={mockApi} />
        </BrowserRouter>
      );
       
       // espera a tabela ser renderizada
       await waitFor(() => {
       expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
       });
    });
});