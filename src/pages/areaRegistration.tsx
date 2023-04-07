import React, { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import '../App.css';

type Params = {
    api:AxiosInstance
}


function AreaRegistration(params: Params) {
  const [dadosArea, setDadosArea] = useState({ 
      nome: '', 
      descricao: ''
    });

    function handleSubmit(event: any){
      event.preventDefault()

      if (checarBranco()){
        alert("Campos em branco!")
        return
      }

    }

    function checarBranco(){
      return ((dadosArea.nome==='' || dadosArea.descricao==='' ))
    }

  return (
    <div className="App">
       <h1>Registro de Área</h1>
      <form>
        <label htmlFor="nome">Nome:<br />
        <input type="text" id="nome" name="nome" data-testid="nome"
          value={dadosArea.nome}
          onChange={e => setDadosArea({ ...dadosArea, nome: e.target.value })}/>
        </label>
        {dadosArea.nome}
        <br />

        <label htmlFor="descricao">Descrição:<br />
        <input type="text" id="descricao" name="descricao" data-testid="descricao"
           value={dadosArea.descricao}
           onChange={e => setDadosArea({ ...dadosArea, descricao: e.target.value})}/>
        </label>
        {dadosArea.descricao}
        <br />

        <button type="submit" data-testid="botaoCadastrar" onClick={handleSubmit}>Cadastrar</button>
      </form>
    </div>
  )
}

export default AreaRegistration