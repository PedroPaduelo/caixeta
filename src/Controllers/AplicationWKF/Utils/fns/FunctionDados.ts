import { get_data_dynamic } from "../FunctionsContext";
import { Insert, Delete, UpData, List_Full, List_Full_By_Col } from "./BD/FunctionsBD";

const created_at = new Date();
const updated_at = new Date();



export async function Dados_Insert(argumentos, context){
  
  const user_created = argumentos.user_email;
  const user_updated = argumentos.user_email;

  const data =  get_data_dynamic(argumentos.dados, context)


  
    try {
      const result = await Insert(argumentos.table, {
        ...data, 
        created_at, 
        updated_at,
        user_created,
        user_updated
      });

      return ({
        status: "success",
        data: result.result,
        message: "Sucesso ao executar Dados_Insert"
      });

    } catch (error) {
      console.log(error)
      return ({
        status: "failed",
        data: error,
        message: "Erro ao executar Dados_Insert"
      });
    }
}  

export async function Dados_UpData(argumentos, context){

  const user_updated = argumentos.user_email;
  const data =  get_data_dynamic(argumentos.dados, context)

  try {
    const result = await UpData(argumentos.table, data["id"], {
      ...data, 
      updated_at,
      user_updated
    });

    return ({
      status: "success",
      data: result.result,
      message: "Sucesso ao executar Dados_UpData"
    });

  } catch (error) {
    console.log(error)
    return ({
      status: "failed",
      data: error,
      message: "Erro ao executar Dados_UpData"
    });
  }
} 

export async function Dados_List(argumentos, context){
  try {
    const result = await List_Full(argumentos.table);
    return ({
      status: "success",
      data: result.result,
      message: "Sucesso ao executar Dados_List"
    });

  } catch (error) {
    console.log(error)
    return ({
      status: "failed",
      data: error,
      message: "Erro ao executar Dados_List"
    });
  }
}  

export async function Dado_Get(argumentos, context){

  const data =  get_data_dynamic(argumentos.dados, context)

  try {
    const result = await List_Full_By_Col(
      argumentos.table,
      data["col"],
      data["col_value"]
      );
    return ({
      status: "success",
      data: result.result,
      message: "Sucesso ao executar Dados_List"
    });

  } catch (error) {
    console.log(error)
    return ({
      status: "failed",
      data: error,
      message: "Erro ao executar Dados_List"
    });
  }
} 





// export async function Dados_Deleta(argumentos, context){
//   try {
//     const result = await Delete(argumentos.table);
//     return ({
//       status: "success",
//       data: result.result,
//       message: "Sucesso ao executar Dados_List"
//     });

//   } catch (error) {
//     console.log(error)
//     return ({
//       status: "failed",
//       data: error,
//       message: "Erro ao executar Dados_List"
//     });
//   }
// } 

// export async function Dados_List_By_Col(argumentos, context){
//   try {
//     const result = await List_Full_By_Col(argumentos.table);
//     return ({
//       status: "success",
//       data: result.result,
//       message: "Sucesso ao executar Dados_List"
//     });

//   } catch (error) {
//     console.log(error)
//     return ({
//       status: "failed",
//       data: error,
//       message: "Erro ao executar Dados_List"
//     });
//   }
// } 



