SELECT * FROM imoveldata;
SELECT * FROM imovelmeta; 
SELECT * FROM review;

SELECT * FROM imoveldata as id
JOIN imovelmeta as im ON id.idimovel = im.idimovel;

SELECT * FROM imoveldata as id
JOIN review as r ON id.idimovel = r.idimovel
ORDER BY id.idimovel;

SELECT id.idimovel, COUNT(id.idimovel) FROM imoveldata as id
JOIN review as r ON id.idimovel = r.idimovel
GROUP BY id.idimovel;

