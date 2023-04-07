import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import Catalogo from '../pages/Catalog';

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

    render(<Catalogo api={mockApi} />);

    // espera a tabela ser renderizada
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
      expect(screen.getByText('Produto 2')).toBeInTheDocument();
    });
  });

  it('mostra o aviso caso a lista de produtos esteja vazia', async () => {
       jest.spyOn(mockApi, 'get').mockResolvedValue({ data: [] });
       
       render(<Catalogo api={mockApi} />);
       
       // espera a tabela ser renderizada
       await waitFor(() => {
       expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
       });
    });
});