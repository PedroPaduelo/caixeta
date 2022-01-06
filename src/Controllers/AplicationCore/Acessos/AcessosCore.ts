import { Get_By_Id, Insert, List_Full, UpData } from '../../../Utils/FunctionsBD';

const table = 'tbl_foundation_acessos'


export async function CreatAcessos(request, response) {
      
  const acessos_path = request.body.acessos_path;
  const acessos_name = request.body.acessos_name;
  const acessos_component = request.body.acessos_component;
  const acessos_icon = request.body.acessos_icon;
  const id_tipo_user = request.body.id_tipo_user;

  const result = await Insert(table, {
    acessos_path,
    acessos_name,
    acessos_component,
    acessos_icon, 
    id_tipo_user
  });
  return response.json(result);
}
export async function UpdateAcessos(request, response) {

  const id = request.body.id;
  const acessos_path = request.body.acessos_path;
  const acessos_name = request.body.acessos_name;
  const acessos_component = request.body.acessos_component;
  const acessos_icon = request.body.acessos_icon;
  const id_tipo_user = request.body.id_tipo_user;

  const result = await UpData(table, id,{
    acessos_path,
    acessos_name,
    acessos_component,
    acessos_icon, 
    id_tipo_user
  });

  return response.json(result);
}

export async function ListByIdAcessos(request, response) {
      const id = request.params.id;

      const result = await Get_By_Id(table, id)
      return response.json(result);
}
export async function ListAcessos(request, response) {
      const result = await List_Full(table)
      return response.json(result);
}
