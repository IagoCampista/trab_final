import React, { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

type Params = {
    api:AxiosInstance
}


function Profile(params: Params) {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [dadosVendedor, setDadosVendedor] = useState({ 
      email: '', 
      nome: ''
    });

    useEffect (() => {
        let authtoken = localStorage.getItem('authToken');
        if (authtoken === '' || authtoken === null){
            setIsLogged(false);
            return
        }
        setIsLogged(true);
        setDadosVendedor(
          { ...dadosVendedor, 
            nome: localStorage.getItem('vendedorNome') as string, 
            email: localStorage.getItem('vendedorEmail') as string  
          })
    }, [])

    function logOff () {
        setDadosVendedor({
            email: '',
            nome: ''
        })
        localStorage.clear();

        navigate('/');
    }
    
    if(isLogged){
      return (
        <div className="App">
          <h1 data-testid="meusDadosHeader">Meus Dados</h1>
          
          <h2 data-testid="vendedorNome">Bem vindo! {dadosVendedor.nome}</h2>
          <h3 data-testid="vendedorEmail">Você está logado com o email: {dadosVendedor.email}</h3>
          <button type="button" data-testid="botaoSair" onClick={logOff}>Sair</button>
          
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <h1 data-testid="meusDadosHeader">Meus Dados</h1>
          <h2 data-testid="notLoggedMessage">Faça Login para ver seus dados</h2>
          <button type="button" data-testid="botaoLogin" onClick={() => navigate('/')}>Login</button>
        </div>
      )
    }

  
}

export default Profile