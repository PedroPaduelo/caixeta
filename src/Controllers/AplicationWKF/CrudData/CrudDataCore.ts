import { Delete, Geral_BD, Get_By_Id, Get_By_Id_Raw, Insert, List, List_Full_By_Col, List_Full_By_Col_like, Raw, Sun_Full, Sun_Full_By_Col, Sun_Full_By_Cols, UpData } from "./FunctionsBD";



// variaveis do ambiente



export async function Creat(request, response) {
  const user_created = request.user_email;
  const user_updated = request.user_email;

  const created_at = new Date();
const updated_at = new Date();

  const table = request.params.table;
  

  const result = await Insert(table, {
    ...request.body, 
    created_at, 
    updated_at,
    user_created,
    user_updated
  });

  return response.json(result);
}
export async function Update(request, response) {
  const user_updated = request.user_email;

  const table = request.params.table;
  const updated_at = new Date();

  const result = await UpData(table, request.body.id, {
    ...request.body,
    updated_at,
    user_updated
  });
  return response.json(result);
}
export async function ListFull(request, response) {
  const table = request.params.table;
  const result = await List(table)
  return response.json(result);
}
export async function ListById(request, response) {
  const table = request.params.table;
  const id = request.params.id;

  const result = await Get_By_Id(table, id)
  return response.json(result);
}
export async function ListByCol(request, response) {
  const table = request.params.table;
  const col = request.params.col;
  const id = request.params.id;

  const result = await List_Full_By_Col(table, col, id)
  return response.json(result);
}
export async function DeletByCol(request, response) {
  const table = request.params.table;
  const id = request.params.id;

  const result = await Delete(table, id)
  return response.json(result);
}
export async function ListByColLike(request, response) {
  const table = request.params.table;
  const col = request.params.col;
  const id = request.params.id.toLowerCase() ;

  const result = await List_Full_By_Col_like(table, col, id)
  return response.json(result);
}
export async function SunByCol(request, response) {
  const table = request.params.table;
  const colSum = request.params.colSum;
  const colWhere = request.params.colWhere;
  const col_value = request.params.col_value;

  const result = await Sun_Full_By_Col(table, colSum, colWhere, col_value)
  return response.json(result);
}
export async function SunByCols(request, response) {
  const table = request.params.table;
  const colSum = request.params.colSum;
  const colWhere1 = request.params.colWhere1;
  const col_value1 = request.params.col_value1;
  const colWhere2 = request.params.colWhere2;
  const col_value2 = request.params.col_value2;

  const result = await Sun_Full_By_Cols(table, colSum, colWhere1, col_value1, colWhere2, col_value2)
  return response.json(result);
}
export async function SunFull(request, response) {
  const table = request.params.table;
  const colSum = request.params.colSum;
  const colWhere = request.params.colWhere || "";
  const col_value = request.params.col_value  || "";
  
  const result = await Sun_Full(table, colSum, colWhere, col_value)
  return response.json(result);
}
export async function ListFullCorrecao(request, response) {



  const result = await List("tbl_produtos")


  // let auxiprodutos = [];

  // while(result.result.length > 0){
  //   const element = result.result.shift();
    

  //   const prodOri = await Get_By_Id("tbl_produtos",element.id)

  //   auxiprodutos.push({
  //     id: element.id,
  //     descricao_prod_lowercase: prodOri.result.descricao_prod.toLowerCase()
  //   })

  // await UpData("tbl_produtos", element.id, {
  //   descricao_prod_lowercase: prodOri.result.descricao_prod.toLowerCase()
  // })



  // }

  return response.json(result);
}
export async function Execut_Raw_By_Cad(request, response) {
  
  const name_query = request.params.name_query;
  const dados = request.body.dados;



  const result_get = await Get_By_Id_Raw("sql_query_custom", "name_query", name_query)

  const result = await Raw(result_get.result.query_sql, dados)


  
  return response.json(result);
}




export async function Geral(request, response) {

  const table = request.params.table;
  const dados = request.body.dados;
  const methodos = request.body.methodos;

  const result = await Geral_BD(methodos, table, dados)

  return response.json(result);
}

