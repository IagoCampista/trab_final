import React, { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import '../App.css';

type IArea = {
    id: number;
    name: string;
}
type Params = {
    api:AxiosInstance
}


function SignUp(params: Params) {
  const [dadosVendedor, setDadosVendedor] = useState({ 
      nome: '', 
      email: '', 
      senha: ''
    });

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

      console.log(dadosVendedor)

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

    useEffect(() => {
        console.log(dadosVendedor)
    }, [dadosVendedor]);

  return (
    <div className="App">
       <h1>Cadastro de Vendedor</h1>
      <form>
        <label htmlFor="nome">Nome:<br />
        <input type="text" id="nome" name="nome" data-testid="nome"
          value={dadosVendedor.nome}
          onChange={e => setDadosVendedor({ ...dadosVendedor, nome: e.target.value })}/>
        </label>
        {dadosVendedor.nome}
        <br />

        <label htmlFor="email">Email:<br />
        <input type="text" id="email" name="email" data-testid="email"
           value={dadosVendedor.email}
           onChange={e => setDadosVendedor({ ...dadosVendedor, email: e.target.value})}/>
        </label>
        {dadosVendedor.email}
        <br />

        <label htmlFor="senha">Senha:<br />
        <input type="text" id="senha" name="senha" data-testid="senha"
           value={dadosVendedor.email}
           onChange={e => setDadosVendedor({ ...dadosVendedor, senha: e.target.value})}/>
        </label>
        {dadosVendedor.senha}
        <br />
       <br />
       

        <button type="submit" data-testid="botaoCadastrar" onClick={handleSubmit}>Cadastrar</button>
      </form>
    </div>
  )
}

export default SignUp