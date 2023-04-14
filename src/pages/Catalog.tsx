import { AxiosInstance } from 'axios';
import React, {useEffect, useState} from 'react'

type IProduto = {
    id: number;
    name: string;
    id_categoria: number;
    preco: number;
    idProdutoSubstituto: number;
}
type ICategoria = {
    id: number;
    name: string;
    descricao: string;
}
type Params = {
    api:AxiosInstance
}

export default function Catalogo (params: Params){
    const [produtos, setProdutos] = useState<IProduto[]>([])
    const [produtosComFiltro, setProdutosComFiltro] = useState<IProduto[]>([])
    const [categorias, setCategorias] = useState<ICategoria[]>([])
    useEffect (() => {
        params.api.get('api/produtos/')
            .then((response) => {
                setProdutos(JSON.parse(response.data) as IProduto[])
                setProdutosComFiltro(JSON.parse(response.data) as IProduto[])
            })
            .catch((err) => {
                console.error('Ocorreu um erro ao receber os dados da API')
                console.log(err)
            });

    }, [])

    useEffect (() => {
        params.api.get('api/categorias')
            .then((response) => {
                setCategorias(response.data)
            })
            .catch((err) => {
                console.error('Ocorreu um erro ao receber os dados da API')
                console.log(err)
            });
    }, [])

    async function handleFiltroCategoria(event: any){
        let categoria = event.target.value;
        if(categoria != 0){
            const produtosFiltrados = produtos.filter((produto) => produto.id_categoria == categoria);
            setProdutosComFiltro(produtosFiltrados);
        }
        else (setProdutosComFiltro(produtos))
        
    }
    return (
        <div>
              <h1>Catalogo de Produtos</h1>
               <form>
                <label htmlFor="filtroCategoriaInput">Categoria:</label>
                <select  id="filtroCategoriaInput" data-testid="filtroCategoriaInput" defaultValue="0" onChange={handleFiltroCategoria}>
                    <option value='0' > Todos </option>
                     {categorias.map((format, index) => {
                                return (
                                    <option value={format.id} key={index}>
                                        {format.name}
                                    </option>
                                );
                            })}
                </select>
               </form>
              {produtos.length === 0 ? (<p>Nenhum produto encontrado</p>) :(
                <table data-testid='TabelaProdutos'>
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

                            {produtosComFiltro.map((produto, index)  => (
                                   <tr key={index}>
                                          <td>{produto.id}</td>
                                          <td>{produto.name}</td>
                                          <td>{produto.id_categoria}</td>
                                          <td>R${produto.preco}</td>
                                          <td>{produto.idProdutoSubstituto}</td>
                                   </tr>
                            ))}
                                   
                     </tbody>
              </table>
              )}
              
        </div>
    )
}