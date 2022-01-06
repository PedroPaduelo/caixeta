import connection from '../../../Database/connection';


export async function Insert(table: string, dados: {}){
        try {
                const result = await connection(table).insert(dados, ['id']);

                dados["id"] = parseInt(result[0].id)

                return ({
                        status: "success",
                        data: dados,
                        message: "Sucesso ao cadastrar"
                }); 
        } catch (error) {
                console.log(error);
                return ({
                        status: "failed",
                        data: error,
                        message: "Erro ao cadastrar"
                });
        }
}
export async function UpData(table: string, id: number, dados: object) {

        try {
              const result = await connection(table)
                                      .where('id', id)
                                      .update(dados);
  
              if(result){
                    const resultGet = await Get_By_Id(table, id)
                    resultGet.message = "Atualização feita com sucesso!!!"
                    return (resultGet); 
              }else{
                    return ({
                          status: "success",
                          data: result,
                          message: "Erro ao atualizar."
                    });
              }
  
        } catch (error) {
                console.log(error);
              return ({
                    status: "failed",
                    data: error,
                    message: "Erro ao atualizar."
              });
        }
  
}
export async function Delete(table: string, id: number) {

      try {
            const result = await connection(table)
                                    .where('id', id)
                                    .del()

            return ({
                  status: "success",
                  data: result,
                  message: "Erro ao Inativar."
            });

      } catch (error) {

            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao Inativar."
            });
      }

}


export async function Get_By_Id(table: string, id: number) {

        try {
              const result = await connection(table).where('id', id).first();
  
              if (result) {
                    return ({
                          status: "success",
                          data: result,
                          message: "Informação localizada!!!"
                    }); 
              }
              else{
                    return({
                          status: "failed",
                          data: {},
                          message: "Informação não localizado!!!"
                    }); 
              } 
  
              
        } catch (error) {
  
              return ({
                    status: "failed",
                    data: error,
                    message: "Erro ao localizar informação"
              });
        }
}
export async function List_Full(table: string) {

      try {
              const result = await connection.select("*")
                      .from(table)
                      

              return ({
                      status: "success",
                      data: result,
                      message: "Sucesso ao listar!!!"
              }); 
      } catch (error) {
            console.log(error);
              return ({
                      status: "success",
                      data: error,
                      message: "Erro ao listar."
              });
      }
}
export async function List_Full_By_Id(table: string, id: string, id_value: number) {

      try {
              const result = await connection.select("*")
                      .from(table)
                      .where(id, id_value)
                      .orderBy(id);

              return ({
                      status: "success",
                      data: result,
                      message: "Sucesso ao listar!!!"
              }); 
      } catch (error) {
              return ({
                      status: "success",
                      data: error,
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
                      data: result,
                      message: "Sucesso ao listar!!!"
              }); 
      } catch (error) {
              return ({
                      status: "success",
                      data: error,
                      message: "Erro ao listar."
              });
      }
}


export async function List_Full_raw(table: string) {

      try {

        const result = await connection.raw(`select * from ${table}`)
          return ({
                  status: "success",
                  data: result,
                  message: "Sucesso ao listar!!!"
          }); 
      } catch (error) {
            console.log(error);
              return ({
                      status: "success",
                      data: error,
                      message: "Erro ao listar."
              });
      }
}
