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



export async function Indice_Prods(request, response) {
  const user_updated = request.user_email;
  const vendas = request.body.dados;
  
  
  
  
  return response.json("OK");
}


