import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ClientRegistration from './ClientRegistration';

describe('Render Test', () => {
    it('renders register page without crashing', ()=> {
        render(<ClientRegistration />)
        expect(screen.getByTestId('nome')).toBeInTheDocument()
        expect(screen.getByTestId('cnpj')).toBeInTheDocument()
        expect(screen.getByTestId('nivelDesconto')).toBeInTheDocument()
        expect(screen.getByTestId('botaoCadastrar')).toBeInTheDocument()
       })
})

describe('RegisterTest', () => {
    it('testa se o os campos estão em branco', () => {
      window.alert = jest.fn()
      render(<ClientRegistration />);
      const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
      const cnpjInput = screen.getByTestId('cnpj') as HTMLInputElement;
      const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

      fireEvent.change(nomeInput, { target: { value: '' } })
      fireEvent.change(cnpjInput, { target: { value: '' } })
      // no select é só nao fazer nada com ele que ele fica em branco

      fireEvent.click(botaoCadastrar)

      expect(window.alert).toHaveBeenCalledWith('Campos em branco!');
    });
    it('testa se o nome é pequeno', () => {
      window.alert = jest.fn()
      render(<ClientRegistration />);
      const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
      const cnpjInput = screen.getByTestId('cnpj') as HTMLInputElement;
      const descontoInput = screen.getByTestId('nivelDesconto') as HTMLSelectElement;
      const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

      fireEvent.change(nomeInput, { target: { value: 'alo' } })
      fireEvent.change(cnpjInput, { target: { value: '1983938398' } })
      fireEvent.change(descontoInput, { target: { value: '1' } })
      
      fireEvent.click(botaoCadastrar)

      expect(window.alert).toHaveBeenCalledWith('O nome inserido é muito pequeno!');
    });
    it('testa se o nome tem menos de 2 palavras', () => {
      window.alert = jest.fn()
      render(<ClientRegistration />);
      const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
      const cnpjInput = screen.getByTestId('cnpj') as HTMLInputElement;
      const descontoInput = screen.getByTestId('nivelDesconto') as HTMLSelectElement;
      const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

      fireEvent.change(nomeInput, { target: { value: 'aloaaaa' } })
      fireEvent.change(cnpjInput, { target: { value: '1983938398' } })
      fireEvent.change(descontoInput, { target: { value: '1' } })
      
      fireEvent.click(botaoCadastrar)

      expect(window.alert).toHaveBeenCalledWith('O nome inserido é muito pequeno!');
    });
    it('testa se o nome esta ok', () => {
      window.alert = jest.fn()
      render(<ClientRegistration />);
      const nomeInput = screen.getByTestId('nome') as HTMLInputElement;
      const cnpjInput = screen.getByTestId('cnpj') as HTMLInputElement;
      const descontoInput = screen.getByTestId('nivelDesconto') as HTMLSelectElement;
      const botaoCadastrar = screen.getByTestId('botaoCadastrar') as HTMLButtonElement;

      fireEvent.change(nomeInput, { target: { value: 'Loja do Mecanico' } })
      fireEvent.change(cnpjInput, { target: { value: '1983938398' } })
      fireEvent.change(descontoInput, { target: { value: '1' } })
      
      fireEvent.click(botaoCadastrar)

      expect(window.alert).not.toHaveBeenCalledWith();
    });
})