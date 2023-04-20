import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import api_axios from '../api';
import ClientList from '../pages/ClientList';
import { BrowserRouter } from 'react-router-dom';

// const mockApi = { get: jest.fn(), post: jest.fn() };

describe('ClientList Tests', () => {
  const mockClients = [
    {id: 1, name: 'LucasFilm', cnpj: '00.000.000/0001-00', nivelDesconto: 'ouro', dataUltimaProspeccao: '2021-09-01', area: 1},
    {id: 2, name: 'Coca-Cola', cnpj: '00.000.000/0002-00', nivelDesconto: 'prata', dataUltimaProspeccao: '2021-09-02', area: 2},
  ];

  const mockApi = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  it('renderiza as tabelas com os clientes', async () => {
    jest.spyOn(mockApi, 'get').mockResolvedValue({ data: mockClients });

    render(
      <BrowserRouter>
        <ClientList api={api_axios} />
      </BrowserRouter>);

    // espera a tabela ser renderizada
    await waitFor(() => {
      expect(screen.getByText('LucasFilm')).toBeInTheDocument();
      expect(screen.getByText('Coca-Cola')).toBeInTheDocument();
    });
  });

  it('mostra o aviso caso a lista de clientes esteja vazia', async () => {
       jest.spyOn(mockApi, 'get').mockResolvedValue({ data: [] });
       
       render( <BrowserRouter><ClientList api={api_axios} /></BrowserRouter>);
       
       // espera a tabela ser renderizada
       await waitFor(() => {
       expect(screen.getByText('Nenhum cliente encontrado')).toBeInTheDocument();
       });
    });
});