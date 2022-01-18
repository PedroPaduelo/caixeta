import connection from "../../../Database/connection";


export async function Insert(table: string, dados: {}){

  try {
    const result = await connection(table).insert(dados, ['id']);

    dados["id"] = parseInt(result[0].id)

    return ({
      status: "success",
      result: dados,
      message: "Sucesso ao cadastrar"
    }); 
  } catch (error) {

    console.log(error);
    return ({
      status: "failed",
      result: error,
      message: "Erro ao cadastrar"
    });
  }
}
export async function UpData(table: string, id: number, dados: object) {

  try {
    const result = await connection(table).where('id', id).update(dados);

    if(result){
      const resultGet = await Get_By_Id(table, id)
      resultGet.message = "Atualização feita com sucesso!!!"
      return (resultGet); 
    }else{
      return ({
        status: "success",
        result: result,
        message: "Erro ao atualizar."
      });
    }

  } catch (error) {
    console.log(error);
    return ({
      status: "failed",
      result: error,
      message: "Erro ao atualizar."
    });
  }
  
}
export async function Delete(table: string, id: number) {

  try {
    const result = await connection(table).where('id', id).del()

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao deletar."
    });

  } catch (error) {

    return ({
      status: "failed",
      result: error,
      message: "Erro ao Inativar."
    });
  }

}
export async function List(table: string) {

  try {
    const result = await connection.select("*").from(table).orderBy("id", "desc");

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao listar dados de " + table + "."
    }); 
  } catch (error) {
    console.log(error);
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar dados de " + table + "."
    });
  }
}
export async function List_Full_By_Col(table: string, col: string, col_value: any) {
  try {
    const result = await connection.select("*")
      .from(table)
      .where(col, col_value)
      .orderBy("id", "desc");

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
export async function Get_By_Id(table: string, id: number) {

  try {
    const result = await connection(table).where('id', id).first();

    if (result) {
      return ({
        status: "success",
        result: result,
        message: "Informação localizada!!!"
      }); 
    }
    else{
      return({
        status: "failed",
        result: {},
        message: "Informação não localizado!!!"
      }); 
    } 

  } catch (error) {

    return ({
      status: "failed",
      result: error,
      message: "Erro ao localizar informação"
    });
  }
}
export async function List_Full(table: string) {

  try {
    const result = await connection.select("*").from(table)

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao listar!!!"
    }); 
  } catch (error) {
    console.log(error);
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
export async function List_Full_By_User_Creating(table: string, user_created: string) {

  try {
    const result = await connection.select("*")
      .from(table)
      .where('user_created', user_created)
      .orderBy('id');

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
export async function List_Full_raw(table: string) {

  try {
  const result = await connection.raw(`select * from ${table}`)
    return ({
            status: "success",
            result: result,
            message: "Sucesso ao listar!!!"
    }); 
  } catch (error) {
    console.log(error);
    return ({
            status: "success",
            result: error,
            message: "Erro ao listar."
    });
  }
}
export async function List_Full_By_Col_like(table: string, col: string, col_value: any) {
  try {
    

    const result = await connection(table).where(col, 'like', '%'+col_value+'%')

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}




export async function Get_By_Id_Raw(table: string, col: string, id: string) {

  try {
    const result = await connection(table).where(col, id).first();

    if (result) {
      return ({
        status: "success",
        result: result,
        message: "Informação localizada!!!"
      }); 
    }
    else{
      return({
        status: "failed",
        result: {},
        message: "Informação não localizado!!!"
      }); 
    } 

  } catch (error) {

    return ({
      status: "failed",
      result: error,
      message: "Erro ao localizar informação"
    });
  }
}

export async function Raw(table: string) {
  try {
    const result = await connection.raw(`${table}`)

    if( typeof(result) === "object" && !Array.isArray(result) ){
      const retorno = {
        rowCount: result.rowCount,
        rows: result.rows,
        fields: result.fields
      }
      return ({
        status: "success",
        result: retorno,
        message: "Sucesso ao listar!!!"
      }); 
    }else{
      const retorno = result.map((item) => {
        console.log(item);
        return {
          rowCount: item.rowCount,
          rows: item.rows,
          fields: item.fields
        } 
      })
      return ({
        status: "success",
        result: retorno,
        message: "Sucesso ao listar!!!"
      });
    }

  } catch (error) {
    console.log(error);
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}














export async function Sun_Full_By_Col(table: string, colSum: string, colWhere: string, col_value: any) {
  try {
    const result = await connection(table)
      .sum(colSum)
      .from(table)
      .where(colWhere, col_value)
      .first();

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}



export async function Sun_Full_By_Cols(table: string, colSum: string, colWhere: string, col_value: any, colWhere1: string, col_value1: any) {
  try {
    const result = await connection(table)
      .sum(colSum)
      .from(table)
      .where(colWhere, col_value)
      .where(colWhere1, col_value1)
      .first();

    return ({
      status: "success",
      result: result,
      message: "Sucesso ao listar!!!"
    }); 
  } catch (error) {
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}



export async function Sun_Full(table: string, colSum: string, colWhere: string, col_value: string) {
  try {

    if(colWhere == ""){
      const result = await connection(table)
      .sum(colSum)
      .from(table)
      .first();

      return ({
        status: "success",
        result: result,
        message: "Sucesso ao listar!!!"
      }); 
    }
    else{
      const result = await connection(table)
      .sum(colSum)
      .from(table)
      .where(colWhere, col_value)
      .first();

      return ({
        status: "success",
        result: result,
        message: "Sucesso ao listar!!!"
      }); 
    }

    

    

    
  } catch (error) {
    console.log(error);
    return ({
      status: "success",
      result: error,
      message: "Erro ao listar."
    });
  }
}
