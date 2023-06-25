CREATE TABLE housedata
(
    houseid SERIAL NOT NULL,
    housetype VARCHAR(255) NOT NULL,
    housebanner VARCHAR(255),
    houseaddress VARCHAR(255) NOT NULL,
    houseprice NUMERIC(10, 2) NOT NULL,
    housedesc TEXT NOT NULL,
    isrent BOOLEAN NOT NULL,
    housedate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT housedata_pkey PRIMARY KEY (houseid)
);

CREATE TABLE housemeta (
  idmeta SERIAL PRIMARY KEY,
  houseid INTEGER REFERENCES housedata(houseid),
  metafieldkey VARCHAR(255),
  metafieldvalue TEXT NOT NULL,
  metadate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_housemeta_housedata FOREIGN KEY (houseid) REFERENCES housedata (houseid) ON DELETE CASCADE
);

CREATE TABLE review (
  idreview SERIAL PRIMARY KEY,
  houseid INTEGER REFERENCES housedata(houseid),
  rating FLOAT NOT NULL,
  comment TEXT,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  reviewdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_review_housedata FOREIGN KEY (houseid) REFERENCES housedata (houseid) ON DELETE CASCADE
);