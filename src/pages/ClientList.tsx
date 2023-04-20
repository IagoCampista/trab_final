import { AxiosInstance } from 'axios';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';


type ICliente = {
    id: number;
    nome: string;
    cnpj: string;
    nivelDesconto: string;
    area: number;
    dataUltimaProspeccao: Date;
}

type Params = {
    api:AxiosInstance
}

export default function ClientList (params: Params){
    const [isLogged, setIsLogged] = useState(false);
    const [showNotLogged, setShowNotLogged] = useState('');
    const [showLogged, setShowLogged] = useState('');
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
    }, [params.api])

    useEffect (() => {
        let authtoken = localStorage.getItem('authToken');
        if (authtoken === '' || authtoken === null){
            setIsLogged(false);
            return
        }
        setIsLogged(true);
    }, [params.api])

    function handleUpdateProspectionDate (cnpj: string) {
        const cnpjData = {cnpj}
        params.api.post('/api/updateProspectionDate', cnpjData)
        .then(async (response) => {
        console.log(response.data);
        if(response.status === 200){
            alert('Data Atualizada com sucesso!');
        }
        })
        .catch((error) => {
        console.log(error.response?.statusText as string);
        alert('Ocorreu um erro ao atualizar a data de prospecção');
        })
        window.location.reload();
    }
    useEffect(() => {
        if(isLogged){
            setShowNotLogged('none');
            setShowLogged('');
        }else{
            setShowNotLogged('');
            setShowLogged('none');
        }
    }, [isLogged])
    return (
        <>
            <div className='App' style={{display: showLogged}} data-testid="loggedDiv">
                <h1 data-testid = 'clientListHeader'>Lista de Clientes</h1>
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
            <div className='App' style={{display: showNotLogged}} data-testid="notLoggedDiv">
                <h1 data-testid = 'clientListHeader'>Lista de Clientes</h1>
                <h2 data-testid='notLoggedMessage'>Voce não está logado</h2>
                <Link 
                    to='/' 
                    data-testid='linkLogin'
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
                    Login
                </Link>
            </div>
        </>
    )
}