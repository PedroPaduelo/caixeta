import connection from "../../Database/connectionDBA";
import { Geral_BD} from "./CrudData/FunctionsBD";



const methodosCuston = {
	"methodos": [
		{
			"methodo": "select",
			"dados": ["itens"]
		}
	]
}








export async function AtualizaVendasEmLot(request, response) {
  
  const table = request.params.table;
  const dados = request.body.dados;
  const methodos = request.body.methodos;
  
  const result = await Geral_BD(methodos, "tbl_vendas", dados)

  let retorno = []

  while(result.result.length > 0){
    const venda = result.result.shift();

    let count = 0;
    let totalPrecoDeCusto = 0;

    while(venda.itens.length > 0){
      const itemDaVenda = venda.itens.shift();
      totalPrecoDeCusto = totalPrecoDeCusto + (parseFloat(itemDaVenda.preco_de_custo) * parseFloat(itemDaVenda.quantidade))
      count = count + 1;
    }
    const resultUp = await Geral_BD( [
        {
          "methodo": "where",
          "dados": [{"id": venda.id}]
        },
        {
          "methodo": "update",
          "dados": [{
            "id": venda.id,
            "preco_de_custo": totalPrecoDeCusto
          }]
        }
      ]
    , "tbl_vendas", "")
  }
 

  return response.json(retorno.flat());
}


















export async function Indice_Prods(request, response) {








  // const teste = await Geral_BD(testesss.methodos, 'tbl_vendas', {});
  // let produtos = [];
  // teste.result.map(async(venda) => {
  //   // produtos.push(...venda.itens)

    
  //   const preco_c = venda.itens.map((vendaItem) => {
  //     const dados_prod = {
  //       id_venda: venda.id,
  //       descricao_prod: vendaItem.descricao_prod,
  //       preco_de_custo: vendaItem.preco_de_custo,
  //       preco_de_venda: vendaItem.preco_de_venda,
  //       quantidade: vendaItem.quantidade,
  //       categorias: vendaItem.categorias,
  //       codigo_de_barras: vendaItem.codigo_de_barras,
  //       fornecedor: vendaItem.fornecedor,
  //       id_prod: vendaItem.id,
  //       marca: vendaItem.marca,
  //       markup: vendaItem.markup,
  //       midia: vendaItem.midia,
  //       promocao: vendaItem.promocao,
  //       unidade: vendaItem.unidade,
  //       total: vendaItem.total,
  //       user_created: venda.user_created,
  //       user_updated: venda.user_updated,
  //       created_at: venda.created_at,
  //       updated_at: venda.updated_at
  //     }
  //     return dados_prod;
  //   })

  //   produtos.push(...preco_c)

  //   return preco_c
  // })
  // // console.log(preco_c)
  // const result = await connection('tbl_vendas_itens').insert(produtos);
  // const resultado = {
  //   tamanho: produtos.length,
  //   produtos: produtos
  // }








  return response.json("");
}






