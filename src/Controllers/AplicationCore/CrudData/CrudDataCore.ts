import { Get_By_Id, Insert, List_Full_raw, UpData } from "../Utils/FunctionsBD";



export async function CreatCrud(request, response) {
  const table = request.params.table;
  const result = await Insert(table, {...request.body});
  return response.json(result);
}
export async function UpdateCrud(request, response) {
  const table = request.params.table;
  const result = await UpData(table, request.body.id, {...request.body});
  return response.json(result);
}

export async function ListByIdCrud(request, response) {
  const table = request.params.table;
  const id = request.params.id;

  const result = await Get_By_Id(table, id)
  return response.json(result);
}
export async function ListCrud(request, response) {
  const table = request.params.table;

  const result = await List_Full_raw(table)
  return response.json(result);
}
