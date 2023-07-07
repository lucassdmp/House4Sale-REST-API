# REST API in Express

This is a basic REST API built using the Express framework. The API provides endpoints to perform CRUD operations on a specific resource.

## Prerequisites

- Node.js installed
- PostgreSQL database configured

## Configuration

1. Clone the repository:
```bash
    git clone https://github.com/lucassdmp/House4SaleDB
```

2. Install the dependencies: 
```bash
    cd House4SaleDB
    npm install
```	


3. Set the environment variables:

    Create an `.env` file in the root directory of the project and set the following environment variables or edit the .env.basic:

```bash
    PGUSER=<DATABASE_USER>
    PGHOST=<DATABASE_HOST>
    PGDATABASE=<DATABASE_NAME>
    PGPASSWORD=<DATABASE_PASSWORD>
    PGPORT=<DATABASE_PORT>
    API_PORT=<SERVER_PORT>
    API_SUFFIX=<ENDPOINTS_SUFFIX>
```

Be sure to replace the values between `< >` with your specific settings.

Access your database and run the following SQL commands to create the tables:

```sql
    CREATE TABLE IF NOT EXISTS housedata
(
    houseid SERIAL PRIMARY KEY NOT NULL,
    housetype VARCHAR(255) NOT NULL,
    housebanner VARCHAR(255),
    houseaddress VARCHAR(255) NOT NULL,
    houseprice NUMERIC(10, 2) NOT NULL,
    housedesc TEXT NOT NULL,
    isrent BOOLEAN NOT NULL,
    housedate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    useremail VARCHAR(255) NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_session (
  id SERIAL PRIMARY KEY,
  session_key VARCHAR(255) NOT NULL,
  date_of_creation TIMESTAMP NOT NULL DEFAULT (EXTRACT(EPOCH FROM TIMESTAMPCURRENT_TIMESTAMP)),
  session_timeout INT NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL
);
```
Run the following SQL command to create a admin user:

```sql
    INSERT into users (username, useremail, password) VALUES ('admin', 'admin@admin.com', 'admin');
```

Run the following SQL command to add houses to the table:
```sql
INSERT INTO housedata (houseid, housetype, housebanner, houseaddress, houseprice, housedesc, isrent, housedate)
VALUES
    (2, 'apartment', 'https://casacor.abril.com.br/wp-content/uploads/sites/7/2022/01/Casa-Liu-Raiz-Arquitetura-Foto-Leonardo-Giantomasi-2.jpg?quality=90&strip=info', '789 Rua Vila Matoso', 2200.00, 'Apresento-lhe uma encantadora casa disponível para aluguel por $2200 mensais. Esta residência aconchegante oferece um ambiente confortável e funcional, perfeito para quem busca um lar acolhedor.\n\nAo adentrar na casa, você será recebido por uma espaçosa sala de estar com uma paleta de cores suaves e pisos de madeira que conferem um ambiente convidativo. As janelas amplas permitem a entrada de luz natural, iluminando o espaço.\n\nA cozinha, adjacente à sala de estar, apresenta armários modernos, eletrodomésticos atualizados e uma ilha central, proporcionando praticidade e um espaço ideal para preparar suas refeições favoritas.\n\nA casa conta com três quartos confortáveis, cada um com espaço suficiente para acomodar uma cama e mobília complementar. O quarto principal inclui um banheiro privativo, enquanto os outros dois quartos compartilham um banheiro adicional.\n\nO quintal privativo é um refúgio tranquilo, com um pequeno jardim, espaço para atividades ao ar livre e uma área de estar coberta, perfeita para desfrutar de momentos de relaxamento ou para receber amigos e familiares.\n\nAlém disso, a casa dispõe de uma garagem anexa com espaço para um carro, além de espaço de armazenamento adicional.\n\nLocalizada em um bairro residencial tranquilo, com acesso conveniente a escolas, parques e comércio local, esta casa oferece uma oportunidade de viver confortavelmente por um valor de aluguel acessível. Com seu charme acolhedor e comodidades práticas, esta residência é um local ideal para criar memórias e desfrutar de uma vida tranquila e confortável.', true, '2023-06-24 20:47:13.225914'),
    (1, 'house', 'https://www.plantapronta.com.br/projetos/161/01.jpg', '123 Rua Benedito', 750000.00, 'Apresento-lhe uma esplêndida casa que certamente justifica seu valor de 750.000 dólares. Esta residência única combina elegância contemporânea com um toque de charme clássico, criando uma atmosfera acolhedora e sofisticada.\n\nAo entrar na propriedade, você será recebido por um imponente jardim paisagístico com uma variedade de plantas exuberantes que emolduram a entrada. A fachada impressionante da casa é revestida em pedra natural, proporcionando um aspecto imponente e duradouro.\n\nAo adentrar pela porta principal, você será imediatamente cativado por uma espaçosa sala de estar com pé-direito duplo, inundada de luz natural através de grandes janelas. Os pisos de madeira nobre e o teto com detalhes trabalhados em gesso conferem um ar de sofisticação ao ambiente.\n\nA cozinha gourmet é um verdadeiro deleite para os amantes da culinária, equipada com os mais modernos eletrodomésticos de aço inoxidável, bancadas em mármore e um amplo espaço para armazenamento. Uma ilha central oferece um local perfeito para refeições rápidas ou para receber amigos e familiares.\n\nA suíte principal é um verdadeiro refúgio de tranquilidade, com uma ampla área de dormir, um espaçoso closet e um luxuoso banheiro privativo revestido em mármore. Além disso, a casa conta com mais três quartos bem dimensionados, perfeitos para acomodar sua família e convidados.\n\nOs espaços ao ar livre são igualmente impressionantes. Um pátio coberto oferece um espaço perfeito para desfrutar de refeições ao ar livre ou para relaxar enquanto contempla o jardim. Uma piscina deslumbrante, rodeada por um deck espaçoso, proporciona o cenário ideal para entretenimento e lazer nos dias ensolarados.\n\nAlém de todos esses atributos, a casa possui uma garagem espaçosa para dois carros, sistema de segurança avançado e tecnologia inteligente que permite o controle dos sistemas de iluminação, temperatura e segurança através de um dispositivo móvel.\n\nLocalizada em um bairro desejável, com fácil acesso a serviços, comércio e áreas verdes, esta casa oferece o equilíbrio perfeito entre privacidade, conforto e estilo de vida elegante. Com seus acabamentos requintados e atenção aos detalhes, é uma verdadeira joia imobiliária que certamente vale o valor de 750.000 dólares.', false, '2023-06-24 20:47:13.225914'),
    (3, 'house', 'https://img.freepik.com/fotos-gratis/uma-casa-azul-com-um-telhado-azul-e-um-fundo-do-ceu_1340-25953.jpg', 'rua rua', 21321321.00, 'dsadsauhndsahudhsau sahduhsa uhdsasad uhdsa uhad suhd asuhd sahuda shud sauhd auhduhas', true, '2023-06-24 22:40:20.070266'),
    (4, 'house', 'https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg', '123 Main Street', 1500.00, 'Spacious apartment with great amenities.', true, '2023-06-24 23:06:36.816941'),
    (5, 'house', 'https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg', '456 Elm Avenue', 250000.00, 'Beautiful house with a large backyard.', false, '2023-06-24 23:06:36.816941'),
    (6, 'house', 'https://cdn.shopify.com/s/files/1/0519/4383/3779/products/07425f8c-6ddb-403c-b9cf-baa89721e13e_1000x.jpg?v=1619726859', '789 Oak Lane', 2000.00, 'Modern condo in a prime location.', true, '2023-06-24 23:06:36.816941'),
    (7, 'house', 'https://cdn.shopify.com/s/files/1/0519/4383/3779/products/ed6d31bc-8f50-493d-8896-3fb6be9d664b.jpg?v=1610042260', '555 Pine Street', 180000.00, 'Cozy townhouse with a small garden.', false, '2023-06-24 23:06:36.816941'),
    (8, 'house', 'https://cdn.shopify.com/s/files/1/0519/4383/3779/products/07425f8c-6ddb-403c-b9cf-baa89721e13e_1000x.jpg?v=1619726859', '777 Maple Drive', 500000.00, 'Luxurious villa with a pool and ocean view.', false, '2023-06-24 23:06:36.816941'),
    (9, 'house', 'https://cdn.houseplansservices.com/product/u3autn69a4eband7oei5e62rai/w1024.jpg?v=2', '321 Cedar Road', 1000.00, 'Compact studio apartment with modern furnishings.', true, '2023-06-24 23:06:36.816941'),
    (10, 'apart', 'https://media.gazetadopovo.com.br/haus/2019/06/tiny-house-nation-haus-1024x683-d5d21fa0.jpg', '222 Elm Street', 300000.00, 'Two-story duplex with separate entrances.', false, '2023-06-24 23:06:36.816941'),
    (11, 'apartment', 'https://cdn.thecoolist.com/wp-content/uploads/2022/01/Types-of-Houses.png', '999 Highrise Avenue', 8000.00, 'Luxury penthouse with panoramic city views.', true, '2023-06-24 23:06:36.816941'),
    (12, 'apartment', 'https://www.capreit.ca/wp-content/uploads/2022/04/2-kol-apartments-ottawa-ON-exterior.jpg', '444 Lakeview Drive', 150000.00, 'Quaint cottage near the lake with a fireplace.', false, '2023-06-24 23:06:36.816941'),
    (13, 'apartment', 'https://images1.forrent.com/i2/4ZRJ-dgwh5URZDHFn-fjwY1VCKpIy35O54rWlNZJPm0/117/image.jpg', '666 Sunset Boulevard', 1000000.00, 'Grand mansion with extensive grounds.', false, '2023-06-24 23:06:36.816941');


```

## Running the API

After completing the configuration, you can run the API using the following command:

```bash
    npm run dev
```


This will start the server on the specified port and the API will be ready to receive requests.

## Endpoints

The API has the following endpoints available:

- `GET /houses`: Returns all houses.
- `GET /houses/type/:type`: Returns all houses of a given type.
- `GET /houses/address/:address`: Returns all houses with a given address.
- `GET /houses/id/:id`: Returns a house by its ID.
- `GET /houses/date/:order`: Returns all houses sorted by date.
- `GET /houses/price/:order`: Returns all houses sorted by price.
- `GET /houses/prices/:price`: Returns all houses with a specific price.
- `POST /post/house`: Adds a new house.
- `DELETE /delete/house/:id`: Deletes a house by ID.

These are just some examples of available endpoints. Be sure to review the source code for the complete list of endpoints and their functions.

## Note

This project was developed for study purposes, in college activities, and therefore will not be maintained.


## License

This project is licensed under the MIT License. See the LICENSE file for more details.
