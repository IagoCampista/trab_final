import React, { useEffect } from 'react';
import '../App.css';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { AxiosError, AxiosInstance } from 'axios';

type Params = {
    api:AxiosInstance
}
type IVendedorData = {
  nome: string;
  email: string;
}
function SignIn(params: Params) {
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLogged, setIsLogged] = useState(false); 
  const [dadosUsuario, setDadosUsuario] = useState({ 
      email: '', 
      senha: ''
    });
  const [dadosVendedor, setDadosVendedor] = useState({ 
      email: '', 
      nome: ''
    });
  
  function handleSubmit(event: any){
    event.preventDefault()

    if (checarBranco()){
      alert("Campos em branco!")
      return
    }

    if (!checarEmail(dadosUsuario.email)) {
      alert("Email inválido!")
      return
    }
    
    params.api.post('/api/login', dadosUsuario)
      .then((response) => {          
        if(response.status === 200){          
          localStorage.setItem('authToken', (response.data));
          adicionarDadosVendedorLocalStorage();     
        }
        else{           
          setErrorMessage(response.data.message as string);               
        }
        
      })
      .catch((error:AxiosError) => {
        setErrorMessage(error.response?.statusText as string);
      });
  }

  function checarBranco(): boolean{
    return ((dadosUsuario.email==='' || dadosUsuario.senha===''))
  }

  function checarEmail(email: string) : boolean{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function adicionarDadosVendedorLocalStorage(){

    params.api.post('api/vendedorPeloEmail' , dadosUsuario)
      .then((response) => {          
          if(response.status === 200){    
            setDadosVendedor(JSON.parse(response.data) as IVendedorData);
            // localStorage.setItem('vendedorNome', dadosVendedor.nome);
            // localStorage.setItem('vendedorEmail', dadosVendedor.email);
          }
          else{           
            alert(response.data.message)                
          }
          
      })
        .catch((error:AxiosError) => {  
          alert(error.response?.statusText as string)   
      });
      window.confirm("Logado com sucesso!");
      window.location.href = '/clientList';
  }

  useEffect(() => {
    if(dadosVendedor.nome !== '' || dadosVendedor.email !== ''){
      localStorage.setItem('vendedorNome', dadosVendedor.nome);
      localStorage.setItem('vendedorEmail', dadosVendedor.email);
    }
  }, [dadosVendedor]);

  useEffect(() => {
    let authtoken = localStorage.getItem('authToken');
    if (authtoken === '' || authtoken === null){
        setIsLogged(false);
        return
    }
    setIsLogged(true);
  }, []);

  if(isLogged){
    
    return (
      <div className="App">
        <h1>Login</h1>
        <h2 data-testid='loggedSucessfullyMessage'>Logado com sucesso!</h2>
          <Link 
            to='/clientList' 
            data-testid='linkCadastro'
            style={{
              backgroundColor: 'lightGrey',
              color: 'black',
              padding: '10px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block',
              textAlign: 'center',
            }}
            >
              Ver Clientes 
          </Link> 
      </div>
    )
  }
  else{
    return (
      <div className="App">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">E-mail:<br />
          <input type="email" id="email" name="email" data-testid="email"
            value={dadosUsuario.email}
            onChange={e => setDadosUsuario({ ...dadosUsuario, email: e.target.value })}/>
          </label>
          <br />

          <label htmlFor="senha">Senha:<br />
          <input type="password" id="senha" name="senha" data-testid="senha"
            value={dadosUsuario.senha}
            onChange={e => setDadosUsuario({ ...dadosUsuario, senha: e.target.value })}/>
          </label>
          <br />
          <br />
          <p data-testid="errorMessage">{errorMessage}</p>
          <button type="submit" data-testid="botaoEntrar" onClick={handleSubmit}>Entrar</button>
        </form>
        <p>Vendedor novo? <Link to='/signUp' data-testid='linkCadastro'>Cadastre-se</Link></p>
      </div>
    )
  }  
}

export default SignIn