# House4SaleDB

```
MODELO:

+-----------------+ 1    N +-----------------+ 1    N +-----------------+
|   ImovelData    |--------|   ImovelMeta    |--------|     Review      |
+-----------------+        +-----------------+        +-----------------+
|    IDImovel(PK) |        |    IDMeta(PK)   |        |   IDReview (PK) |
|      Tipo       |        |  IDImovel (FK)  |        |  IDImovel (FK)  |
|     Banner      |        |  MetafieldKey   |        |     Rating      | 
|    Endereco     |        | MetafieldValue  |        |   Comentario    |
|      Preco      |	   |   DataCriacao   | 	      |	     Nome       |											
|    Descricao    |        +-----------------+        |     Email       |
| Disponibilidade |                                   +-----------------+
+-----------------+


Obs: Tipo (Casa ou AP), Disponibilidade (Aluguel ou Venda), MetafieldKey - título da imagem e MetafieldValue - caminho da imagem


EXEMPLO COM DADOS MOCKADOS:

Tabela "ImovelData":

+----------+------+------------+----------------------+----------+-------------------+-------------------+
| IDImovel | Tipo |  Banner    |       Endereco       |  Preco   |    Descricao      | Disponibilidade    |
+----------+------+------------+----------------------+----------+-------------------+-------------------+
|    1     | Casa | casa1.jpg  | 123 Rua Benedito     | 750000   | Casa grande       |      Venda         |
|    2     | Casa | casa2.jpg  | 789 Rua Vila Matoso  | 870000   | Casa refrescante  |     Aluguel        |
+----------+------+------------+----------------------+----------+-----------------+----------------------+


Tabela "ImovelMeta":

+--------+----------+--------------+---------------------------------------+---------------------+
| IDMeta | IDImovel | MetafieldKey |           MetafieldValue               |     DataCriacao    |
+--------+----------+--------------+---------------------------------------+----------------------
|   1    |    1     |   Cozinha    |       /caminho/para/imagem_cozinha.jpg |  23-06-22 10:25:15 |
|   2    |    1     |   Sala       |       /caminho/para/imagem_sala.jpg    |  23-06-22 09:25:13 |
|   3    |    2     |   Quarto     |       /caminho/para/imagem_quarto.jpg  |  23-06-22 12:13:15 |
|   4    |    2     |   Banheiro   |       /caminho/para/imagem_banheiro.jpg|  23-06-22 10:25:11 |
+--------+----------+--------------+---------------------------------------+---------------------+

Tabela "Review":

+----------+----------+--------+-----------------+-----------------------+
| IDReview | IDImovel | Rating |   Comentario    |       Email            |
+----------+----------+--------+-----------------+-----------------------+
|    1     |    1     |   8.5  | Linda casa!     | alexandre@example.com  |
|    2     |    1     |   3.9  | Recomendo Muito.| paulo@example.com      |
|    3     |    2     |   4.2  | Belo imóvel.    | lucas@example.com      |
|    4     |    2     |   3.5  | Sublime.        | alysson@example.com    |
|    5     |    1     |   4.1  | Sublime.        | matheus@example.com    |
+----------+----------+--------+-----------------+------------------------+

```
