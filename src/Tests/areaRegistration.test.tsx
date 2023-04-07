import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AreaRegistration from '../pages/areaRegistration';
import axios from 'axios';

jest.mock('axios');

describe('AreaRegistration Render Tests', () => {
  it('Renderiza o heading', () => {
    render(<AreaRegistration api={axios.create()} />);
    const heading = screen.getByText('Registro de Área');
    expect(heading).toBeInTheDocument();
  });

  it('Renderiza os campos de input', () => {
    render(<AreaRegistration api={axios.create()} />);
    const nomeInput = screen.getByTestId('nome');
    const descricaoInput = screen.getByTestId('descricao');

    expect(nomeInput).toBeInTheDocument();
    expect(descricaoInput).toBeInTheDocument();
  });
});

describe('AreaRegistration Register Test', () => {

  it('mostra o alerta caso algum campo esteja em branco', () => {
    window.alert = jest.fn()
    render(<AreaRegistration api={axios.create()} />);
    const submitButton = screen.getByTestId('botaoCadastrar');

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Campos em branco!');
  });

  it('nao mostra o alerta se tudo estiver completo', () => {
    window.alert = jest.fn()
    render(<AreaRegistration api={axios.create()} />);
    const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
    const descricaoInput = screen.getByTestId('descricao') as HTMLInputElement;
    const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

    fireEvent.change(nomeInput, { target: { value: 'Centro' } })
    fireEvent.change(descricaoInput, { target: { value: 'Toda a regegião central da cidade' } })

    fireEvent.click(botaoCadastrar)
    
    expect(window.alert).not.toHaveBeenCalledWith();
  });
});