import { Insert } from "./Utils/FunctionsBD";


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
