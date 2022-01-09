import connection from '../../../../Database/connection';


export async function Get_User_By_Email(user_email) {

      try {
            const result = await connection('tbl_user').where('user_email', user_email).first();

            delete result.password
            delete result.token

            if (result) {
                  return ({
                        status: "success",
                        data: result,
                        message: "Usuário localizado!!!"
                  }); 
            }
            else{
                  return({
                        status: "failed",
                        data: {},
                        message: "Usuário não localizado!!!"
                  }); 
            } 

            
      } catch (error) {

            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao localizar usuário!!!"
            });
      }
}
export async function Get_User_By_Email_With_Password(user_email) {

      try {
            const result = await connection('tbl_user').where('user_email', user_email).first();

            delete result.token

            if (result) {
                  return ({
                        status: "success",
                        data: result,
                        message: "Usuário localizado!!!"
                  }); 
            }
            else{
                  return({
                        status: "failed",
                        data: {},
                        message: "Usuário não localizado!!!"
                  }); 
            } 

            
      } catch (error) {

            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao localizar usuário!!!"
            });
      }
}
export async function Get_User_By_Email_Valid(email) {

      try {
            const result = await connection('tbl_user').where('user_email', email).first();

            delete result.password
            delete result.token

            if (result) {
                  return({
                        status: "failed",
                        data: result,
                        message: "Usuário já cadastrado!!!"
                  });
            }
            else{
                  return({
                        status: "success",
                        data: {},
                        message: "Cadastre o usuário"
                  }); 
            } 

      } catch (error) {
            console.log(error)
            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao Validar usuário!!!"
            });
      }
}
export async function Set_User(dados) {
      try {
            const result = await connection('tbl_user').insert(dados);

            return ({
                  status: "success",
                  data: result,
                  message: "Inserte feito com sucesso!!!"
            }); 
      } catch (error) {

            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao inserir usuário."
            });
      }
}
export async function Set_UpData_User(email, dados) {

      try {
            const result = await connection('tbl_user')
                                    .where('user_email', email)
                                    .update(dados);

            if(result){
                  const resultGet = await Get_User_By_Email(email)

                  resultGet.message = "Atualização feita com sucesso!!!"

                  return (resultGet); 
            }else{
                  return ({
                        status: "failed",
                        data: result,
                        message: "Erro ao atualização usuário."
                  });
            }

      } catch (error) {
        console.log(error)
            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao atualização usuário."
            });
      }

}
export async function Get_List_Users() {

      try {
            const result = await connection.select(
                  'user_email',
                  'user_fist_name',
                  'user_last_name',
                  'user_fisrt_access',
                  'user_tipo',
                  'user_photo_file',
                  'user_created_at',
                  'user_updated_at'
            ).from('tbl_user')

            return ({
                  status: "success",
                  data: result,
                  message: "Busca de lista de usuário feita com sucesso!!!"
            }); 
      } catch (error) {

            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao Busca de lista de usuário."
            });
      }
}
export async function Get_List_Acessos_By_Users(id_tipo_user) {

      try {
            const result = await connection.select('tbl_foundation_acessos.*')
                                          .from('tbl_foundation_acessos')
                                          .where('id_tipo_user', id_tipo_user);

            return ({
                  status: "success",
                  data: result,
                  message: "Busca das filas atreladas ao user feita com sucesso!!!"
            }); 
      } catch (error) {

            return ({
                  status: "failed",
                  data: error,
                  message: "Erro ao Busca das filas atreladas ao user."
            });
      }
}
