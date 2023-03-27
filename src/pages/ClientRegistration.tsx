import React, { useEffect } from 'react';
import '../App.css';
import { useState } from 'react'

function ClientRegistration() {
  const [dadosCliente, setDadosCliente] = useState({ 
      nome: '', 
      cnpj: '', 
      nivelDesconto: '', 
      area: '' 
    });

    const niveisDesconto = [
       {id:1, nome:'prata'}, 
       {id:2, nome:'ouro'}, 
       {id:3, nome:'diamante'}, 
       {id:4, nome:'ruby'}, 
       {id:5, nome:'esmeralda'}];

    function handleSubmit(event: any){
      event.preventDefault()

      if (!checarNome(dadosCliente.nome)){
        alert("O nome inserido é muito pequeno!")
        return
      }

      console.log(dadosCliente)

    }

    function checarNome(nome: string){
      const NomeSeparado = nome.trim().split(/\s+/);
      return ((nome.length >3 ) && (NomeSeparado.length > 1))
    }

    function handleSelectedDiscountLevel(event: any){
       let position = event.target.value;

        setDadosCliente({ ...dadosCliente, nivelDesconto: niveisDesconto[position].nome });
    }

    useEffect(() => {
        console.log(dadosCliente)
    }, [dadosCliente]);

  return (
    <div className="App">
      <form>
        <label htmlFor="nome">Nome:<br />
        <input type="text" id="nome" name="nome" data-testid="nome"
          value={dadosCliente.nome}
          onChange={e => setDadosCliente({ ...dadosCliente, nome: e.target.value })}/>
        </label>
        {dadosCliente.nome}
        <br />

        

        <label htmlFor="cnpj">CNPJ:<br />
        <input type="text" id="cnpj" name="cnpj" data-testid="cnpj"
           value={dadosCliente.cnpj}
           onChange={e => setDadosCliente({ ...dadosCliente, cnpj: e.target.value})}/>
        </label>
        {dadosCliente.cnpj}
        <br />

        <label htmlFor='nivelDescont'>Nível de desconto: <br /></label>
        <select onChange={handleSelectedDiscountLevel} id="nivelDesconto" data-testid="nivelDesconto">
              <option value='0' disabled> Nível </option>
                     {niveisDesconto.map((nivel, index) => {
                            return (
                                   <option value={index} key={index}>
                                         {nivel.nome}
                                   </option>
                            );
                     })}
       </select>
       <br />
       <br />
       

        <button type="submit" data-testid="botaoCadastrar" onClick={handleSubmit}>Cadastrar</button>
      </form>
    </div>
  )
}

export default ClientRegistration