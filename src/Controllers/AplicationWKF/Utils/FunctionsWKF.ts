
import { Dados_Insert, Dados_List, Dado_Get, Dados_UpData } from './fns/FunctionDados';
import { get_data_dynamic } from './FunctionsContext';



const functions = {
  Dados_Insert, 
  Dados_List, 
  Dado_Get, 
  Dados_UpData
}


export function IF(argumentos, context) {
  
  if(argumentos.length > 0){

    const reultIfs = argumentos.map(item => {

      const value_1 = get_data_dynamic(context, item.value_1 ) 
      const value_2 = get_data_dynamic(context, item.value_2 ) 
      const comparador =  item.comparador
        
      const condicao =  comparador === "==" ? value_1 === value_2 : 
                        comparador === "!==" ? value_1 !== value_2 : 
                        comparador === ">" ? value_1 > value_2 : 
                        comparador === "<" ? value_1 < value_2 : 
                        comparador === ">=" ? value_1 >= value_2 : 
                        comparador === "<=" ? value_1 <= value_2 : 
                        
                        false
      return condicao
    })
    
    return reultIfs.every(function(item){return item === true})
  }else{
    
    return true
  }
}
export async function EXECUT_ACTION(action_name, action_tipo, action_processo, context, flag_execut) {
  let obj_result = {
    result_fn_name: {},
    result_fn_tipo: {},
    result_fn_status: {},
    result_fn_result: {}
  }

  if(flag_execut){
    const result = await functions[action_tipo](action_processo, context)
    obj_result.result_fn_name = action_name
    obj_result.result_fn_tipo =  action_tipo
    obj_result.result_fn_status =  result.status
    obj_result.result_fn_result = result.data
  }
  else{
    obj_result.result_fn_name = action_name
    obj_result.result_fn_tipo =  action_tipo
    obj_result.result_fn_status =  "failed"
    obj_result.result_fn_result = "Condição não atendida"
  }


  return obj_result
}

