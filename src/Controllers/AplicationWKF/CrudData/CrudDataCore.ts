import { Delete, Get_By_Id, Insert, List, List_Full_By_Col, List_Full_By_Col_like, Sun_Full, Sun_Full_By_Col, UpData } from "./FunctionsBD";



// variaveis do ambiente
const created_at = new Date();
const updated_at = new Date();


export async function Creat(request, response) {
  const user_created = request.user_email;
  const user_updated = request.user_email;

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
  const id = request.params.id;

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

export async function SunFull(request, response) {
  const table = request.params.table;
  const colSum = request.params.colSum;

  const result = await Sun_Full(table, colSum)
  return response.json(result);
}


