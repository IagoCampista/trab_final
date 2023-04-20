import React, { useEffect, useState } from 'react';
import { AxiosInstance } from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

type IArea = {
    id: number;
    name: string;
}
type Params = {
    api:AxiosInstance
}


function ClientRegistration(params: Params) {
  const [isLogged, setIsLogged] = useState(false);
  const [dadosCliente, setDadosCliente] = useState({ 
      nome: '', 
      cnpj: '', 
      nivelDesconto: '', 
      area: '',
      dataUltimaProspeccao: new Date().toISOString().slice(0, 10)
    });

    const [areas, setAreas] = useState<IArea[]>([])

    useEffect (() => {
        params.api.get('api/areas/')
            .then((response) => {
                setAreas(response.data)
            })
            .catch((err) => {
                console.error('Ocorreu um erro ao receber os dados da API')
                console.log(err)
            });

    }, [params.api])

    useEffect (() => {
        let authtoken = localStorage.getItem('authToken');
        if (authtoken === '' || authtoken === null){
            setIsLogged(false);
            return
        }
        setIsLogged(true);
    }, [params.api])

    const niveisDesconto = [
       {id:1, nome:'prata'}, 
       {id:2, nome:'ouro'}, 
       {id:3, nome:'diamante'}, 
       {id:4, nome:'ruby'}, 
       {id:5, nome:'esmeralda'}];

    function handleSubmit(event: any){
      event.preventDefault()

      if (checarBranco()){
        alert("Campos em branco!")
        return
      }

      if (!checarNome(dadosCliente.nome)){
        alert("O nome inserido é muito pequeno!")
        return
      }

      params.api.post('/api/registerClientes', dadosCliente)
      .then(async (response) => {
        console.log(response.data);
        if(response.status === 200){
          alert('Cliente adicionado com sucesso');
        }
      })
      .catch((error) => {
        // console.log(error.response?.statusText as string);
        alert('Ocorreu um erro ao adicionar o cliente' + error.response?.statusText as string);
      })
    }

    function checarNome(nome: string){
      const NomeSeparado = nome.trim().split(/\s+/);
      return ((nome.length >3 ) && (NomeSeparado.length > 1))
    }

    function checarBranco(){
      return ((dadosCliente.nome==='' || dadosCliente.cnpj==='' || dadosCliente.nivelDesconto === '' || dadosCliente.area === ''))
    }

    function handleSelectedDiscountLevel(event: any){
       let position = event.target.value;

        setDadosCliente({ ...dadosCliente, nivelDesconto: niveisDesconto[position].nome });
    }
    function handleSelectedArea(event: any){
       let position = event.target.value;

        setDadosCliente({ ...dadosCliente, area: areas[position].name });
    }

    
  return (
    <div className="App">
      <h1>Registro de Clientes</h1>
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
        <select onChange={handleSelectedDiscountLevel} id="nivelDesconto" data-testid="nivelDesconto" defaultValue="0">
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
        <label htmlFor='area'>Área: <br /></label>
        <select onChange={handleSelectedArea} id="area" data-testid="area" defaultValue="0">
              <option value='0' disabled>Área</option>
                     {areas.map((nivel, index) => {
                            return (
                                   <option value={index} key={index}>
                                         {nivel.name}
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