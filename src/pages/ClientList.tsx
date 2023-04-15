import { AxiosInstance } from 'axios';
import { log, timeLog } from 'console';
import React, {useEffect, useState} from 'react'


type ICliente = {
    id: number;
    nome: string;
    cnpj: string;
    nivelDesconto: string;
    area: number;
    dataUltimaProspeccao: Date;
}
type IArea = {
    id: number;
    name: string;
}

type Params = {
    api:AxiosInstance
}

export default function ClientList (params: Params){

    const [clientes, setClientes] = useState <ICliente[]>([])
    useEffect (() => {
        params.api.get('api/clientes/')
            .then((response) => {
              setClientes(JSON.parse(response.data) as ICliente[])
            })
            .catch((err) => {
                console.error('Ocorreu um erro ao receber os dados dos clientes da API')
                console.log(err)
            });
    }, [])
    
    const [area, setArea] = useState <IArea[]>([])
    useEffect (() => {
        params.api.get('api/areas')
            .then((response) => {
              setArea(response.data)
            })
            .catch((err) => {
                console.error('Ocorreu um erro ao receber os dados das areas da API')
                console.log(err)
            });
    }, [])

    function handleUpdateProspectionDate (cnpj: string) {
        const cnpjData = {cnpj}
        params.api.post('/api/updateProspectionDate', cnpjData)
        .then(async (response) => {
        console.log(response.data);
        if(response.status == 200){
            alert('Data Atualizada com sucesso!');
        }
        })
        .catch((error) => {
        console.log(error.response?.statusText as string);
        alert('Ocorreu um erro ao atualizar a data de prospecção');
        })
        window.location.reload();
    }

    return (
        <div>
              <h1>Lista de Clientes</h1>
              {clientes.length === 0 ? (<p>Nenhum cliente encontrado</p>) : (
                <table data-testid="tabelaClientes">
                     <thead>
                            <tr>
                                   <th>id</th>
                                   <th>Nome</th>
                                   <th>CNPJ</th>
                                   <th>Nível de Desconto</th>
                                   <th>Data da Última Prospecção</th>
                                   <th>Area</th>
                            </tr>
                     </thead>
                     <tbody>

                            {clientes.map((cliente, index) => (
                                   <tr key={index}>
                                          <td>{cliente.id}</td>
                                          <td>{cliente.nome}</td>
                                          <td>{cliente.cnpj}</td>
                                          <td>{cliente.nivelDesconto}</td>
                                          <td>{cliente.dataUltimaProspeccao.toString()}</td>
                                          <td>{cliente.area}</td>                                          
                                          <td><button type="button" data-testid="botaoAtualizarData" onClick={() => handleUpdateProspectionDate(cliente.cnpj)}>Atualizar Data Prospecção</button></td>                                          
                                   </tr>
                            ))}
                                   
                     </tbody>
              </table>
              )}
              
        </div>
    )
}