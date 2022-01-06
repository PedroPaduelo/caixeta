CREATE TABLE tbl_user (
 user_email VARCHAR(250) NOT NULL,
 user_password VARCHAR(100) NOT NULL,
 user_fist_name VARCHAR(250) NOT NULL,
 user_last_name VARCHAR(250) NOT NULL,
 user_photo_file VARCHAR(1000),
 user_fisrt_access  INTEGER NOT NULL DEFAULT 1,
 user_token VARCHAR(10000),
 user_tipo INTEGER NOT NULL,
 user_created_at DATE NOT NULL,
 user_updated_at DATE NOT NULL
);
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_pkey PRIMARY KEY (user_email);

CREATE TABLE tbl_foundation_acessos (
 id BIGSERIAL NOT NULL,
 id_tipo_user INTEGER NOT NULL,
 acessos_path VARCHAR(5000) NOT NULL,
 acessos_name VARCHAR(250) NOT NULL,
 acessos_component VARCHAR(250) NOT NULL,
 acessos_icon VARCHAR(250) NOT NULL
);
ALTER TABLE tbl_foundation_acessos ADD CONSTRAINT tbl_foundation_acessos_pkey PRIMARY KEY (id);

CREATE TABLE tbl_foundation_tipo_user (
 id BIGSERIAL NOT NULL,
 tipo_user_descr VARCHAR(250) NOT NULL
);
ALTER TABLE tbl_foundation_tipo_user ADD CONSTRAINT tbl_foundation_tipo_user_pkey PRIMARY KEY (id);

CREATE TABLE tbl_produtos (
 id BIGSERIAL NOT NULL,
 descricao_prod VARCHAR(5000) NOT NULL,
 codigo_de_barras VARCHAR(500) NOT NULL,
 categorias VARCHAR(500) NOT NULL,
 marca VARCHAR(500) NOT NULL,
 preco_de_custo DECIMAL NOT NULL,
 markup INTEGER NOT NULL,
 preco_de_venda DECIMAL,
 unidade VARCHAR(500) NOT NULL,
 fornecedor VARCHAR(500) NOT NULL,
 qtd_em_estoque INTEGER NOT NULL,
 qtd_estoque_min INTEGER NOT NULL DEFAULT 0,
 qtd_estoque_max INTEGER NOT NULL DEFAULT 10,
 status VARCHAR(500) NOT NULL,
 promocao VARCHAR(500) NOT NULL,
 midia VARCHAR(10000)
);
ALTER TABLE tbl_produtos ADD CONSTRAINT tbl_produtos_pkey PRIMARY KEY (id);

CREATE TABLE tbl_clientes (
 id BIGSERIAL NOT NULL,
 nome VARCHAR(500) NOT NULL,
 telefone_whats VARCHAR(50),
 endereco json NOT NULL
);
ALTER TABLE tbl_clientes ADD CONSTRAINT tbl_clientes_pkey PRIMARY KEY (id);

CREATE TABLE tbl_caixa (
 id BIGSERIAL NOT NULL,
 tipo_da_acao VARCHAR(500) NOT NULL,
 valro_em_dinheiro DECIMAL NOT NULL DEFAULT 0,
 valro_em_credito DECIMAL NOT NULL DEFAULT 0,
 valro_em_debito DECIMAL NOT NULL DEFAULT 0
);
ALTER TABLE tbl_caixa ADD CONSTRAINT tbl_caixa_pkey PRIMARY KEY (id);

CREATE TABLE tbl_contas (
 id BIGSERIAL
);
ALTER TABLE tbl_contas ADD CONSTRAINT tbl_contas_pkey PRIMARY KEY (id);

CREATE TABLE tbl_vendas (
 id BIGSERIAL NOT NULL,
 tipo VARCHAR(500) NOT NULL,
 itens json ARRAY NOT NULL,
 preco_final DECIMAL NOT NULL,
 meio_pagto VARCHAR(500) NOT NULL
);
ALTER TABLE tbl_vendas ADD CONSTRAINT tbl_vendas_pkey PRIMARY KEY (id);

CREATE TABLE dp_categorias_de_produtos (
 id BIGSERIAL NOT NULL,
 descri_categoria VARCHAR(500) NOT NULL
);
ALTER TABLE dp_categorias_de_produtos ADD CONSTRAINT dp_categorias_de_produtos_pkey PRIMARY KEY (id);

CREATE TABLE dp_marcas_de_produtos (
 id BIGSERIAL NOT NULL,
 descri_marca VARCHAR(500) NOT NULL
);
ALTER TABLE dp_marcas_de_produtos ADD CONSTRAINT dp_marcas_de_produtos_pkey PRIMARY KEY (id);

CREATE TABLE dp_fornecedor_de_produtos (
 id BIGSERIAL NOT NULL,
 descri_fornecedor VARCHAR(500) NOT NULL
);
ALTER TABLE dp_fornecedor_de_produtos ADD CONSTRAINT dp_fornecedor_de_produtos_pkey PRIMARY KEY (id);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_user_tipo_fkey FOREIGN KEY (user_tipo) REFERENCES tbl_foundation_tipo_user(id);
ALTER TABLE tbl_foundation_acessos ADD CONSTRAINT tbl_foundation_acessos_id_tipo_user_fkey FOREIGN KEY (id_tipo_user) REFERENCES tbl_foundation_tipo_user(id);


