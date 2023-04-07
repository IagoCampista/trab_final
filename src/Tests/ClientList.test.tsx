import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'
import ClientList from '../pages/ClientList';

describe('ClientList Tests', () => {
  const mockClients = [
    {id: 1, name: 'LucasFilm', cnpj: '00.000.000/0001-00', nivelDesconto: 'ouro', dataUltimaProspeccao: '2021-09-01', area: 1},
    {id: 2, name: 'Coca-Cola', cnpj: '00.000.000/0002-00', nivelDesconto: 'prata', dataUltimaProspeccao: '2021-09-02', area: 2},
  ];

  const mockApi = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  it('renderiza as tabelas com os produtos', async () => {
    jest.spyOn(mockApi, 'get').mockResolvedValue({ data: mockClients });

    render(<ClientList api={mockApi} />);

    // espera a tabela ser renderizada
    await waitFor(() => {
      expect(screen.getByText('LucasFilm')).toBeInTheDocument();
      expect(screen.getByText('Coca-Cola')).toBeInTheDocument();
    });
  });

  it('mostra o aviso caso a lista de produtos esteja vazia', async () => {
       jest.spyOn(mockApi, 'get').mockResolvedValue({ data: [] });
       
       render(<ClientList api={mockApi} />);
       
       // espera a tabela ser renderizada
       await waitFor(() => {
       expect(screen.getByText('Nenhum cliente encontrado')).toBeInTheDocument();
       });
    });
});