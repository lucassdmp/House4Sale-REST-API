-- Inserir dados na tabela "imoveldata"
INSERT INTO imoveldata (idimovel, tipo, banner, endereco, preco, descricao, disponibilidade)
VALUES
  (1, 'Casa', 'casa1.jpg', '123 Rua Benedito', 750000, 'Casa grande', 'Venda'),
  (2, 'Casa', 'casa2.jpg', '789 Rua Vila Matoso', 870000, 'Casa refrescante', 'Aluguel');

-- Inserir dados na tabela "imovelmeta"
INSERT INTO imovelmeta (idmeta, idimovel, metafieldkey, metafieldvalue, datacriacao)
VALUES
  (1, 1, 'Cozinha', '/caminho/para/imagem_cozinha.jpg', '2022-06-23 10:25:15'),
  (2, 1, 'Sala', '/caminho/para/imagem_sala.jpg', '2022-06-23 09:25:13'),
  (3, 2, 'Quarto', '/caminho/para/imagem_quarto.jpg', '2022-06-23 12:13:15'),
  (4, 2, 'Banheiro', '/caminho/para/imagem_banheiro.jpg', '2022-06-23 10:25:11');

-- Inserir dados na tabela "review"
INSERT INTO review (idreview, idimovel, rating, comentario, nome, email)
VALUES
  (1, 1, 8.5, 'Linda casa!', 'Alexandre','alexandre@example.com'),
  (2, 1, 3.9, 'Recomendo Muito.', 'Paulo', 'paulo@example.com'),
  (3, 2, 4.2, 'Belo imóvel.', 'Lucas', 'lucas@example.com'),
  (4, 2, 3.5, 'Sublime.', 'Alysson', 'alysson@example.com'),
  (5, 1, 4.1, 'Sublime.', 'Matheus', 'matheus@example.com');
