import React, { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

type Params = {
    api:AxiosInstance
}


function SignUp(params: Params) {
  const [isLogged, setIsLogged] = useState(false); 
  const [dadosVendedor, setDadosVendedor] = useState({ 
      nome: '', 
      email: '', 
      senha: ''
    });
    
    useEffect(() => {
    let authtoken = localStorage.getItem('authToken');
    if (authtoken === '' || authtoken === null){
        setIsLogged(false);
        return
    }
    setIsLogged(true);
  }, []);

    function handleSubmit(event: any){
      event.preventDefault()

      if (checarBranco()){
        alert("Campos em branco!")
        return
      }

      if (!checarNome(dadosVendedor.nome)){
        alert("O nome inserido é muito pequeno!")
        return
      }

      if (!checarEmail(dadosVendedor.email)) {
        alert("Email inválido!")
        return
      }

      params.api.post('/api/registerVendedores', dadosVendedor)
      .then(async (response) => {
        if(response.status === 200){
          alert('Cliente adicionado com sucesso');
        }
      })
      .catch((error) => {
        alert('Ocorreu um erro ao adicionar o cliente!   ' + error.response?.statusText as string);
      })
    }

    function checarNome(nome: string){
      const NomeSeparado = nome.trim().split(/\s+/);
      return ((nome.length >3 ) && (NomeSeparado.length > 1))
    }

    function checarBranco(){
      return ((dadosVendedor.nome==='' || dadosVendedor.email==='' || dadosVendedor.senha === ''))
    }

    function checarEmail(email: string) : boolean{
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }

    if(isLogged){
      return(
        <div className="App">
          <h1>Cadastro de Vendedor</h1>
          <h2 data-testid="alreadyLoggedMessage">Você já está logado!</h2>
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <h1>Cadastro de Vendedor</h1>
          <form>
            <label htmlFor="nome">Nome:<br />
            <input type="text" id="nome" name="nome" data-testid="nome"
              value={dadosVendedor.nome}
              onChange={e => setDadosVendedor({ ...dadosVendedor, nome: e.target.value })}/>
            </label>
            <br />

            <label htmlFor="email">Email:<br />
            <input type="text" id="email" name="email" data-testid="email"
              value={dadosVendedor.email}
              onChange={e => setDadosVendedor({ ...dadosVendedor, email: e.target.value})}/>
            </label>
            <br />

            <label htmlFor="senha">Senha:<br />
            <input type="password" id="senha" name="senha" data-testid="senha"
              value={dadosVendedor.senha}
              onChange={e => setDadosVendedor({ ...dadosVendedor, senha: e.target.value})}/>
            </label>
            <br />
          <br />
          

            <button type="submit" data-testid="botaoCadastrar" onClick={handleSubmit}>Cadastrar</button>
          </form>
          <p>Já é cadastrado? <Link to='/' data-testid='linkLogin'>Entre</Link></p>
        </div>
      )
    }
}
  

export default SignUp