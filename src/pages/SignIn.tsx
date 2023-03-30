import React from 'react';
import '../App.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate =useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState({ 
      email: '', 
      senha: ''
    });

    function handleSubmit(event: any){
      event.preventDefault()
        navigate('/signup');
      console.log(dadosUsuario)

    }

    function checarSenhaValida(senha: string): boolean {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      console.log(regex.test(senha));
      return !regex.test(senha);
      
    }

  return (
    <div className="App">
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