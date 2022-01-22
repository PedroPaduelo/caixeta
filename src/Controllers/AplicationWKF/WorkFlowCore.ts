import connection from "../../Database/connectionDBA";
import { Geral_BD, Insert, Raw } from "./CrudData/FunctionsBD";
import { UpData } from "./Utils/FunctionsBD";

// variaveis do ambiente
const updated_at = new Date();

export async function AtualizaVendasEmLot(request, response) {
  const user_updated = request.user_email;
  const vendas = request.body.dados;
  
  while (vendas.length > 0) {
    const venda = vendas.shift();

      const result = await UpData('tbl_vendas', venda.id, {
        ...venda,
        status_caixa: 'Fechado', 
        updated_at,
        user_updated
      }
    );
  }
  return response.json("OK");
}






const testesss = {
	"methodos": [
		{
			"methodo": "select",
			"dados": []
		}
	]
}


export async function Indice_Prods(request, response) {






  const rawresult = await Raw("select id_venda, sum(preco_de_custo)::numeric(10,2) , avg(markup)::numeric(10,2) , count(id_venda) from tbl_vendas_itens GROUP BY id_venda",false)








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








  return response.json(rawresult);
}






