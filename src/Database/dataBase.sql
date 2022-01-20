
select 
	a.*,
	CASE
     WHEN total_pago is not NULL  THEN total_pago
     WHEN total_pago is NULL  THEN 0
     ELSE  0
	END as total_pago,
	CASE
		 WHEN total_venda_crediario is not NULL  THEN total_venda_crediario
		 WHEN total_venda_crediario is NULL  THEN 0
		 ELSE  0
	END as total_venda_crediario,
	CASE
     WHEN total_pago is not NULL  THEN total_venda_crediario - total_pago
     WHEN total_pago is NULL  THEN total_venda_crediario
     ELSE  0
	END as saldo_devedor
	
from tbl_clientes  a
	left join (select 
							a.meio_pagto,
							a.cliente,
							b.nome as nome_do_cliente,
							sum(a.preco_final) as total_venda_crediario

						from tbl_vendas  a
							left join tbl_clientes b on b.id = a.cliente
							WHERE a.meio_pagto = 'Crediario'
						GROUP BY  a.meio_pagto, a.cliente, nome) as crediario
	on a.id = crediario.cliente

	left join (select 
							a.id_cliente,
							b.nome as nome_do_cliente,
							sum(a.valor_pago) as total_pago

						from tbl_crediarios_pagos   a
							left join tbl_clientes b on b.id = a.id_cliente
						GROUP BY   a.id_cliente, nome) as pagamento
	on a.id = pagamento.id_cliente






















  
  
select 
  a.id,
  a.tipo,
  a.itens,
  a.preco_final,
  a.meio_pagto,
  a.cliente,
  b.nome as nome_do_cliente,
  a.status_caixa,
  a.referencia_externa,
  to_char(a.created_at, 'dd/mm/yyyy') as created_at,
  to_char(a.created_at, 'HH24:MI:SS') as hora_at

from tbl_vendas a
  left join tbl_clientes b on b.id = a.cliente;
  
select 
  a.id,
  a.tipo,
  a.itens,
  a.preco_final,
  a.meio_pagto,
  a.cliente,
  b.nome as nome_do_cliente,
  a.status_caixa,
  a.referencia_externa,
  to_char(a.created_at, 'dd/mm/yyyy') as created_at,
  to_char(a.created_at, 'HH24:MI:SS') as hora_at

from tbl_vendas a
  left join tbl_clientes b on b.id = a.cliente;



