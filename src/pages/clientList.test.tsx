import { fireEvent, render, screen } from '@testing-library/react';
import api_axios from '../api'
import ClientList from './ClientList';

describe('Render Test', () => {
    it('renders register page without crashing', ()=> {
        render(<ClientList api = {api_axios}/>)
        expect(screen.getByTestId('tabelaClientes')).toBeInTheDocument()
       })
})