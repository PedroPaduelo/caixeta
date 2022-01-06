import axios from 'axios';
import url from 'url';



function api_params_to_obj(arrayParams){
  let paramsObj = {}

  arrayParams.map(item => {
    paramsObj[item.key] = item.value
  })
  
  const returno = new url.URLSearchParams(paramsObj);
  return paramsObj

  
}
function api_headers_to_obj(api_headers){
  let headersObj = {}

  api_headers.map(item => {
    headersObj[item.key] = item.value
  })

  return headersObj

  
}

export async function Api(argumentos){

  const params = api_params_to_obj(argumentos.api_parameters);
  const headers = api_headers_to_obj(argumentos.api_headers);

    try {
      const result = await axios({
        method: argumentos.api_method,
        url: argumentos.api_path,
        params: params,
        headers: headers
      }); 
      return ({
        status: "success",
        data: result.data,
        message: "Sucesso ao executar API"
      });

    } catch (error) {
      console.log(error)
      return ({
        status: "failed",
        data: error,
        message: "Erro ao executar API"
      });
    }
}  














