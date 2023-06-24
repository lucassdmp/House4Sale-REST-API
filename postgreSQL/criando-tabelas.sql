
-- Criação da tabela imoveldata
CREATE TABLE imoveldata (
  idimovel SERIAL PRIMARY KEY,
  tipo VARCHAR(255) NOT NULL,
  banner VARCHAR(255),
  endereco VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  descricao TEXT NOT NULL,
  disponibilidade VARCHAR(255)
);


-- Criação da tabela imovelmeta
CREATE TABLE imovelmeta (
  idmeta SERIAL PRIMARY KEY,
  idimovel INTEGER REFERENCES imoveldata(idimovel),
  metafieldkey VARCHAR(255),
  metafieldvalue VARCHAR(255),
  datacriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_imovelmeta_imoveldata FOREIGN KEY (idimovel) REFERENCES imoveldata (idimovel) ON DELETE CASCADE
);

-- Criação da tabela review
CREATE TABLE review (
  idreview SERIAL PRIMARY KEY,
  idimovel INTEGER REFERENCES imoveldata(idimovel),
  rating FLOAT NOT NULL,
  comentario TEXT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  CONSTRAINT fk_review_imoveldata FOREIGN KEY (idimovel) REFERENCES imoveldata (idimovel) ON DELETE CASCADE
);
