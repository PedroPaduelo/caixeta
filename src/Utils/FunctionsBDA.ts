import connection from '../Database/connectionDBA';




// Tables
export async function created_table(table_name: string){
  try {

    const result = await connection.schema.createTable(table_name, function (table) {
      table.increments();
      table.string('user_created');
      table.timestamp('created_at');
      table.string('user_updated');
      table.timestamp('updated_at');
    })

    return ({
      status: "success",
      data: result,
      message: "Criado com sucesso"
    }); 

  } 
  
  catch (error) {
    return ({
      status: "failed",
      data: error,
      message: "Erro ao cadastrar"
    });
  }
}
export async function drop_table(table_name: string){

  try {
    const result = await connection.schema.dropTable(table_name)

    return ({
      status: "success",
      data: result,
      message: "Tabela deletada com sucesso"
    }); 

  } 
  
  catch (error) {
    return ({
      status: "failed",
      data: error,
      message: "Tabela não deletada"
    });
  }


}
export async function rename_table(oldTableName: string, newTableName: string){

  try {
    const result = await connection.schema.renameTable(oldTableName, newTableName)
    return ({
      status: "success",
      data: result,
      message: "Tabela renomeada"
    }); 

  } 
  
  catch (error) {
    return ({
      status: "failed",
      data: error,
      message: "Tabela não renomeada"
    });
  }

}




// Columns
export async function add_column_table(
  tableName: string, 
  columnName: string, 
  columnType: string, 
  columnLength: number, 
  column_default: string, 
  column_not_null: string
){


  if(column_default == ""){ 
    column_default = null;
  }

  if(columnLength == null){ 
    columnLength = 255;
  }

  
  try {
    const result = await connection.schema.table(tableName, function (table) {


      if(column_not_null !== "Sim"){
        table[columnType](columnName, columnLength).notNullable()?.defaultTo(column_default)
      }

      else {
        table[columnType](columnName, columnLength)?.defaultTo(column_default)
      }


    })

    return ({
      status: "success",
      data: result,
      message: "Tabela alterada"
    }); 

  } 
  catch (error) {
    return ({
      status: "failed",
      data: error,
      message: "Tabela não alterada"
    });
  }
}
export async function rename_column_table(
  tableName: string, 
  columnName: string,
  newcolumnName: string, 
  columnType: string, 
  columnLength: number, 
  column_default: string, 
  column_not_null: string
){

  if(column_default == ""){ 
    column_default = null;
  }

  if(columnLength == null){ 
    columnLength = 255;
  }

  try {
    
    const result = await connection.schema.table(tableName, function (table) {

      if(columnName !== newcolumnName && newcolumnName !== ""){
        table.renameColumn(columnName, newcolumnName);
      }
      if(column_not_null === "Sim"){
        table.setNullable(columnName)
      }
      if(column_not_null === "Não"){
        table.dropNullable(columnName)
      }

    })

    return ({
      status: "success",
      data: result,
      message: "Tabela renomeada"
    }); 

  } 
  
  catch (error) {
    console.log(error)
    return ({
      status: "failed",
      data: error,
      message: "Tabela não renomeada"
    });
  }

}
export async function drop_column_table(tableName: string, columnName: string){

  try {
    const result = await connection.schema.table(tableName, function (table) {
      table.dropColumn(columnName);
    })

    return ({
      status: "success",
      data: result,
      message: "Coluna deletada"
    }); 

  } 
  catch (error) {
    console.log(error)
    return ({
      status: "failed",
      data: error,
      message: "Coluna não deletada"
    });
  }
}






export async function list_schema() {
  try {
    const result = await connection.raw("select * from information_schema.schemata where schema_name <> 'information_schema' and schema_name <> 'pg_catalog' and schema_name <> 'pg_toast_temp_1' and schema_name <> 'pg_temp_1' and schema_name <> 'pg_toast'")
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
export async function list_tables() {
  try {
    const result = await connection.raw("select table_catalog, table_schema, table_name, table_type      " +
                                        "from information_schema.tables where table_schema <> 'pg_catalog' and table_schema <> 'information_schema' order by table_name")  
    return ({
      status: "success",
      data: result.rows,
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
export async function list_fields(table_name: string) {

  try {
    const result = await connection.raw(
      `  select 
            table_catalog,
            table_schema,
            table_name,
            column_name,
            ordinal_position,
            column_default,
            is_nullable,
            data_type,
            character_maximum_length
          from information_schema.columns 
          where table_schema <> 'information_schema' and 
                table_schema <> 'pg_catalog' and 
                table_schema <> 'pg_toast_temp_1' and 
                table_schema <> 'pg_temp_1' and 
                table_schema <> 'pg_toast' and
                table_name = '${table_name}'`
    )
    return ({
      status: "success",
      data: result.rows,
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
export async function list_constraint() {
  try {
    const result = await connection.raw("select * from information_schema.constraint_table_usage")
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