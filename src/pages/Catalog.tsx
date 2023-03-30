import { AxiosInstance } from 'axios';
import React, {useEffect, useState} from 'react'

type IProduto = {
    id: number;
    name: string;
    id_categoria: number;
    preco: number;
    idProdutoSubstituto: number;
}
type Params = {
    api:AxiosInstance
}

export default function Catalogo (params: Params){
    const [produtos, setProdutos] = useState<IProduto[]>([])
    useEffect (() => {
        params.api.get('api/produtos/')
            .then((response) => {
                console.log(response);
                setProdutos(response.data)
            })
            .catch((err) => {
                console.error('Ocorreu um erro ao receber os dados da API')
                console.log(err)
            });

    }, [])

    return (
        <div>
              <h1>Catalogo de Produtos</h1>
              <table>
                     <thead>
                            <tr>
                                   <th>id</th>
                                   <th>Nome</th>
                                   <th>Categoria</th>
                                   <th>Preço</th>
                                   <th>Produto Substituto</th>
                            </tr>
                     </thead>
                     <tbody>

                            {produtos.map(produto => (
                                   <tr>
                                          <td>{produto.id}</td>
                                          <td>{produto.name}</td>
                                          <td>{produto.id_categoria}</td>
                                          <td>R${produto.preco}</td>
                                          <td>{produto.idProdutoSubstituto}</td>
                                   </tr>
                            ))}
                                   
                     </tbody>
              </table>
        </div>
    )
}