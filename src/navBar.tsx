import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="container">
        <Link to='/catalogo' data-testid='linkCatalogo'>Catálogo</Link> <br /> 
        <Link to='/clientList' data-testid='linkClientes'>Clientes</Link> <br />
        <Link to='/clientRegistration' data-testid='linkRegistroCliente'>Registro de Clientes</Link> <br />
        <Link to='/profile' data-testid='linkProfile'>Meus Dados</Link> <br />
        <Link to='/signUp' data-testid='linkCadastro'>Cadastro</Link> <br />
        <Link to='/' data-testid='linkLogin'>Login</Link><br />
	
    </div>
  );
}

export default NavBar;
