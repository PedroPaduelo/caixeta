import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { 
      Get_User_By_Email,
      Get_User_By_Email_With_Password,
      Get_User_By_Email_Valid,
      Set_User,
      Set_UpData_User,
      Get_List_Users,
      Get_List_Acessos_By_Users
} from './Utils/functiosUser';

const user_fisrt_access = 1

const user_created_at = new Date();
const user_updated_at = new Date();

// Funções importadas nas rotas 
export async function Creat(request, response) {
      
  const user_email = request.body.user_email.toLowerCase();
  const user_password = await hash(request.body.user_password, 10);

  // Dados enviados
  const user_fist_name = request.body.user_fist_name;
  const user_last_name = request.body.user_last_name;
  const user_photo_file = request.body.user_photo_file;
  const user_tipo = request.body.user_tipo;

  // Busca email para validar se o user ja ta na base
  const user = await Get_User_By_Email_Valid(user_email)

  // Chek de se o user ja foi criado
  if (user.status === "failed") {

    const userCadResult = await Set_User({
      user_email,
      user_password,
      user_fist_name,
      user_last_name,
      user_photo_file,
      user_tipo,
      user_fisrt_access,
      user_created_at,
      user_updated_at
    });

    if (userCadResult.status === "success") {
      const userCad = await Get_User_By_Email(user_email)
      userCad.message = "Usuário cadastrado com sucesso!!!"
      return response.json(userCad);
    }else{
      return response.json(userCadResult);
    }  
  }
  
  return response.json(user);
}
export async function List(request, response) {

      const user = await Get_List_Users()

      return response.json(user);
}
export async function Update(request, response) { 
  const user_email = request.body.user_email.toLowerCase();
  const user_password = await hash(request.body.user_password, 10);
  // Dados enviados
  const user_fist_name = request.body.user_fist_name;
  const user_last_name = request.body.user_last_name;
  const user_photo_file = request.body.user_photo_file;
  const user_tipo = request.body.user_tipo;
  const caixa_aberto = request.body.caixa_aberto;
  const caixa_id = request.body.caixa_id;



  // Busca email para validar se o user ja ta na base
  const user = await Get_User_By_Email_Valid(user_email)

  if (user.status === "success"){
        return response.json(user);
  }else{
    const userUpData = await Set_UpData_User(user_email, {
      user_email,
      user_password,
      user_fist_name,
      user_last_name,
      user_photo_file,
      user_tipo,
      user_fisrt_access,
      caixa_aberto,
      caixa_id,
      user_updated_at
    });
    return response.json(userUpData);
  }
}
export async function Login(request, response) {

  // Token de Acesso do G-mail enviado via body post
  const user_password = request.body.user_password;
  const user_email = request.body.user_email;

  // Busca email para validar se o user ja ta na base
  const user = await Get_User_By_Email_With_Password(user_email)

  if (user.status === "failed"){
    return response.json(user);
  }

  if (!await compare(user_password, user.data.user_password)) {
    return response.json({
      status: "failed",
      data: {},
      message: "Erro ao logar usuário, procure o administrador do sistema!!!"
    });
  }else{

    const user_token = sign({ user_email: user.data.user_email }, "asdasd", {
      expiresIn: 8640000000,
    });

    if (!user_token) {
      return response.json(false);
    }

    const acessos = await Get_List_Acessos_By_Users(user.data.user_tipo)

    user.data.acessos = acessos.data;
    user.data.user_token = user_token;

    if(user.data.user_fisrt_access === 1){
      user.message = `Olá ${user.data.user_fist_name} seja bem vindo!`;
    }else{
      user.message = `Olá ${user.data.user_fist_name} seja bem vindo de volta!`;
    }

    return response.json(user);
  }

}
export async function Refresh(request, response) {
  const user = await Get_User_By_Email_With_Password(request.user_email)
  if (user) {
    const acessos = await Get_List_Acessos_By_Users(user.data.user_tipo)
    user.data.acessos = acessos.data;
    delete user.data.password
    return response.json(user);
  }
  return response.json(false);
}

