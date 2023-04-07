import React from 'react';
import '../App.css';
import { useState } from 'react'

function SignIn() {

  const [dadosUsuario, setDadosUsuario] = useState({ 
      email: '', 
      senha: ''
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
      console.log(dadosUsuario)

    }

    function checarBranco(): boolean{
      return ((dadosUsuario.email==='' || dadosUsuario.senha===''))
    }

    function checarEmail(email: string) : boolean{
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }

  return (
    <div className="App">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">E-mail:
        <input type="email" id="email" name="email" data-testid="email"
           value={dadosUsuario.email}
           onChange={e => setDadosUsuario({ ...dadosUsuario, email: e.target.value })}/>
        </label>
        {dadosUsuario.email}
        <br />

        <label htmlFor="senha">Senha:
        <input type="password" id="senha" name="senha" data-testid="senha"
           value={dadosUsuario.senha}
           onChange={e => setDadosUsuario({ ...dadosUsuario, senha: e.target.value })}/>
        </label>
        {dadosUsuario.senha}
        <br />

        <button type="submit" data-testid="botaoEntrar" onClick={handleSubmit}>Entrar</button>
      </form>
    </div>
  )
}

export default SignIn